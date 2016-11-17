'use strict';

var QQ = QQ || {};

QQ.GameSeizure.prototype.makeGround = function(config) {
	var obj = new QQ.Subject('./img/earth.png', config.size.w, config.size.h);
	obj.setPosition(config.pos.x, config.pos.y, QQ.Subject.pivot.CENTERTOP);
	obj.setDefaultPhysics({ isStatic: true });
	obj.type = function() {
		return 'ground';
	};
	return obj;
};
