'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

QQ.GameSeizure.prototype.makeRamp = function(config) {
	var obj = new QQ.Subject('./img/ramp.png', config.size.w, config.size.h);
	obj.setDefaultPhysics({ isStatic: true});
	
	var pivotX = config.pos.x;
	var prevX  = pivotX;
	var pivotY = config.pos.y;
	var period = config.period;
	var time   = config.time || 0;
	var range  = config.travel;
	var angle  = 0;
	
	obj.setTick( function(delta) {
			time += delta;
			time  = QQ.Math.devidePeriod(time, period);
			angle = time/period * QQ.Math.PIx2;
			var x = pivotX + range * Math.sin(angle);
			Matter.Body.setVelocity(this.getPhysicsBody(), { x: x-prevX, y: 0 });
			Matter.Body.setPosition(this.getPhysicsBody(), { x: x, y: pivotY });
			prevX = x;
		});
	
	obj.type = function() {
		return 'ramp';
	};
	
	return obj;
};
