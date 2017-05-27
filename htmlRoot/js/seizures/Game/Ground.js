game.seizures.Game.Ground = class Ground extends QQ.Subject.Physics {
	
	constructor(app, config) {
		super(
				app,
				false,
				'img/earth.png',
				config.size.w,
				config.size.h
			);
		this.setPosition(config.pos.x, config.pos.y, QQ.Math.pivot.CENTERTOP);
		this.setDefaultPhysics({ isStatic: true });
	}
	
	type() {
		return 'ground';
	}
	
};
