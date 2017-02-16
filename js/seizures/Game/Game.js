QQ.Seizures.SeizureGame = class Game
	extends QQ.Seizures.SeizureBase
{
	
	constructor(level) {
		super(true);
		this._name     = level.name;
		this._isFinish = false;
		
		this._camera.init(
			level.cfg.camera.size.w,   level.cfg.camera.size.h,
			level.cfg.camera.lookAt.x, level.cfg.camera.lookAt.y
		);
		
		this._world.setPauseable(true);
		this._world.addBackground(level.cfg.backGround.img);
		
		this._world.addSubject(new Game.EscapeShip(level.cfg.escapeShip, this));
		
		for ( let ground of level.cfg.grounds ) {
			this._world.addSubject(new Game.Ground(ground));
		}
		for ( let ramp of level.cfg.ramps ) {
			this._world.addSubject(new Game.Ramp(ramp));
		}
		for ( let alien of level.cfg.aliens ) {
			this._world.addSubject(new Game.Alien(alien, this));
		}
		
		this._setHud('GameHud');
	}
	
	tick(delta) {
		const aliens = this._getSubjectsByType('alien');
		if ( aliens.length === 0 && ! this._isFinish ) {
			this._isFinish = true;
			this._app.storage('level'+this._name, 'DONE');
			setTimeout(
				() => QQ.seizures.popUp('EndLevel', this._name),
				500
			);
		}
		this.tickWorld(delta);
	}
	
	click(x, y) {
		if ( this._isFinish ) {
			return;
		}
		super.click(x, y);
	}
	
	getWorld() {
		return this._world;
	}
	
	getWorldPhysics() {
		return this._world.getPhysics();
	}
	
	getSurfaces() {
		let grounds = this._getSubjectsByType('ground');
		let ramps   = this._getSubjectsByType('ramp');
		return [].concat(grounds, ramps);
	}
	
	getApp() {
		return this._app;
	}
	
	_getSubjectsByType(type) {
		let units = this._world.getSubjects(
			subj => (subj.type() === type)
		);
		return units;
	}
	
};

QQ.seizures.add('Game', QQ.Seizures.SeizureGame);
