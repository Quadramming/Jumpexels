'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

QQ.GameSeizure.prototype.makeEscapeShip = function(config) {
	var world   = this.getWorld();
	var angle   = 0;
	var time    = 0;
	var pivotX  = config.pos.x;
	var pivotY  = config.pos.y;
	var travelX = config.travel.w;
	var travelY = config.travel.h;
	var period  = config.period;
	
	var subj = new QQ.Subject('./img/spaceShip.png', 150, 150);
	
	Matter.Events.on(this.getWorldPhysics(), 'collisionStart', function(event) {
			var pairs = event.pairs;
			var me    = subj.getPhysicsBody();
			for ( var i = 0, j = pairs.length; i !== j; ++i ) {
				var pair = pairs[i];
				var escaped = null;
				if ( pair.bodyA === me ) {
					escaped = world.getSubjectByPhysics(pair.bodyB);
				} else if ( pair.bodyB === me ) {
					escaped = world.getSubjectByPhysics(pair.bodyA);
				}
				if ( escaped ) {
					escaped.escape();
				}
			}
		});

	subj.setDefaultPhysics({ isStatic: true, isSensor: true });

	subj.setTick( function(delta) {
			time += delta;
			time  = QQ.Math.devidePeriod(time, period);
			angle = time/period * QQ.Math.PIx2;

			Matter.Body.setPosition(this.getPhysicsBody(), {
				x: pivotX + travelX * Math.sin(angle  ),
				y: pivotY + travelY * Math.sin(angle*2)
			});
		});
	
	subj.type = function() {
		return 'escapeShip';
	};
	
	return subj;
};

