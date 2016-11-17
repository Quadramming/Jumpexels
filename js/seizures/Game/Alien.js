'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

QQ.GameSeizure.prototype.makeAlien = function(config) {
	var self = this;
	var subj = new QQ.Subject('./img/animals/parrotSquare.png', 50, 50);
	subj.setPosition(config.pos.x, config.pos.y, QQ.Subject.pivot.CENTERBOTTOM);
	subj.setPhysics(config.pos.x, config.pos.y, 50, 50);
	var body = subj.getPhysicsBody();
	
	Matter.Events.on(this.getWorldPhysics(), 'collisionActiv', function(event) {
			var pairs = event.pairs;
			var me    = subj.getPhysicsBody();
			for ( var i = 0, j = pairs.length; i !== j; ++i ) {
				var pair = pairs[i];
				if ( pair.bodyA === me || pair.bodyB === me ) {
					var x = me.velocity.x;
					Matter.Body.setVelocity(me, { x : x, y : 10 });
				}
			}
	});
	
	subj.jump = function() {
		var surfaces = self.getSurfaces();
		var pairs = [];
		surfaces.forEach( function(el) {
			pairs.push([body, el.getPhysicsBody()]);
		});
		
		var collisions = Matter.Detector.collisions(pairs, self.getWorldPhysics());
		c(collisions);
		collisions.forEach( function(collision) {
			if ( collision.bodyA === body || collision.bodyB === body ) {
				var x = body.velocity.x;
				Matter.Body.setVelocity(body, { x : x, y : 10 });
			}
		});
	};
	
	subj.type = function() {
		return 'alien';
	};
	
	return subj;
};