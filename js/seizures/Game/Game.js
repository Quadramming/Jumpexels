//================================================================
// Name: QQ.Levels
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Seizures.SeizureGame = class Game {

	constructor(app, level) {
		const my      = QQ.Seizures.SeizureGame;
		this._app     = app;
		this._huds    = [];
		this._world   = new QQ.World();
		this._camera  = null;
		this._started = false;
		
		this._world.createPhysics();
		this._camera = new QQ.Camera(
				app.getCanvas(), 
				level.camera.size.w,   level.camera.size.h, 
				level.camera.lookAt.x, level.camera.lookAt.y
			);

		this._world.addBackground(level.backGround.img);

		this._world.addSubject(new my.EscapeShip(level.escapeShip, this));

		for ( const ground of level.grounds ) {
			this._world.addSubject(new my.Ground(ground));
		}
		for ( const ramp of level.ramps ) {
			this._world.addSubject(new my.Ramp(ramp));
		}
		for ( const alien of level.aliens ) {
			this._world.addSubject(new my.Alien(alien, this));
		}

		const backHud = new QQ.Hud('img/back.png', 15);
		backHud.setPosition(1, 1, QQ.Hud.pivot.LEFTTOP );
		backHud.setClick( () => {
				QQ.seizures.set('Levels');
			});
		this._huds.push(backHud);
		
		this._started = true;
	}

	tick(delta) {
		if ( this._started ) {
			const aliens = this._getSubjectsByType('alien');
			if ( aliens.length === 0 ) {
				QQ.Application.get().setSeizure('Levels');
			}
			if ( this._world ) {
				this._world.tick(delta);
			}
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
		for ( const hud of this._huds ) {
			const isHit = hud.isHit(
					this._camera.widthToPercent(x), 
					this._camera.heightToPercent(y)
				);
			if ( isHit ) {
				hud.click();
			}
		}
		/*
		var units = this._world.getSubjects(function(subj) {
				return subj.type() === 'alien';
			});
		units.forEach(function(alien) {
				alien.jump();
			});
			
		if ( this._camera ) {
			var point   = this._camera.getWorldPoint(x, y);
			var clicked = this._world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
		}
		*/
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
