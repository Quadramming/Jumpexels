//================================================================
// Name: QQ.Levels
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Seizures.SeizureGame = class Game {

	constructor(app, level, levelN) {
		this._app      = app;
		this._levelN   = levelN;
		this._huds     = [];
		this._world    = new QQ.World();
		this._camera   = null;
		this._isFinish = false;

		this._world.setPauseable(true);
		this._world.createPhysics();
		this._camera = new QQ.Camera(
				app.getCanvas(), 
				level.camera.size.w,   level.camera.size.h, 
				level.camera.lookAt.x, level.camera.lookAt.y
			);

		this._world.addBackground(level.backGround.img);

		this._world.addSubject(new Game.EscapeShip(level.escapeShip, this));

		for ( const ground of level.grounds ) {
			this._world.addSubject(new Game.Ground(ground));
		}
		for ( const ramp of level.ramps ) {
			this._world.addSubject(new Game.Ramp(ramp));
		}
		for ( const alien of level.aliens ) {
			this._world.addSubject(new Game.Alien(alien, this));
		}

		const backHud = new QQ.Hud('img/back.png', 15);
		backHud.setPosition(1, 1, QQ.Math.pivot.LEFTTOP );
		backHud.setClick( () => QQ.seizures.popUp('Pause') );
		this._huds.push(backHud);
	}

	tick(delta) {
		const aliens = this._getSubjectsByType('alien');
		if ( aliens.length === 0 && ! this._isFinish ) {
			this._isFinish = true;
			this._app.storage('level'+this._levelN, 'DONE');
			setTimeout(
					() => QQ.seizures.popUp('EndLevel', this._levelN),
					500
				);
		}
		if ( this._world ) {
			this._world.tick(delta);
		}
	}
	
	draw() {
		if ( this._camera ) {
			const rect   = this._camera.getViewRect();
			const toDraw = this._world.getSubjectsInRect(rect);
			this._camera.draw(toDraw);
			this._camera.drawHud(this._huds);
		}
	}
	
	click(x, y) {
		if ( this._isFinish ) {
			return;
		}
		for ( const hud of this._huds ) {
			const isHit = hud.isHit(
					this._camera.widthToPercent(x), 
					this._camera.heightToPercent(y)
				);
			if ( isHit ) {
				hud.click();
			}
		}
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
