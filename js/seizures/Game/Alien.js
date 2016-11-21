'use strict';

var Matter  = Matter || {};
var QQ      = QQ     || {};

QQ.GameSeizure.prototype.makeAlien = function(config) {
	var self = this;
	var subj = new QQ.Subject('./img/animals/parrotSquare.png', 50, 50);
	subj.setPosition(config.pos.x, config.pos.y, QQ.Subject.pivot.CENTERBOTTOM);
	subj.setPhysics(config.pos.x, config.pos.y, 50, 50);
	var body = subj.getPhysicsBody();
	var time = self.getApp().getTime();
	
	subj._timeToEscape = 300;
	subj._startEscape  = 0;
	
	subj.setTick( function() {
		if ( this._startEscape > 0 ) {
			var alpha = 1-QQ.Math.calcProgress(this._startEscape, this._timeToEscape);
			this.setAlpha(alpha);
			if ( alpha === 0 ) {
				self.getWorld().deleteSubject(this);
			}
		} else {
			if ( self.getApp().isM1Pressed() ) {
				this.jump();
			}
		}
	});
	
	subj.escape = function() {
		if ( this._startEscape === 0 ) {
			this._startEscape = Date.now();
		}
	};
	
	subj.jump = function() {
		var surfaces = self.getSurfaces();
		var pairs = [];
		surfaces.forEach( function(el) {
			pairs.push([body, el.getPhysicsBody()]);
		});
		
		var collisions = Matter.Detector.collisions(pairs, self.getWorldPhysics());

		collisions.forEach( function(collision) {
			if ( collision.bodyA === body || collision.bodyB === body ) {
				c(body);
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