//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global QQ */
'use strict';

class Levels {
	
	constructor(app) {
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);

		this._world.addBackground( new QQ.Subject('img/backgrounds/tmpMenu.png') );
		
		let level = new QQ.Subject('img/level.png', 5, 5);
		level.setPosition(-5, 5);
		level.click = function() {
			QQ.Application.get().setSeizure('Game', 1);
		};
		this._world.addSubject(level);
	
		level = new QQ.Subject('img/level.png', 5, 5);
		level.setPosition(5, 5);
		level.click = function() {
			QQ.Application.get().setSeizure('Game', 2);
		};
		this._world.addSubject(level);
	}
	
	tick(delta) {
		if ( this._world ) {
			this._world.tick(delta);
		}
	}
	
	draw() {
		if ( this._camera ) {
			const rect   = this._camera.getViewRect();
			const toDraw = this._world.getSubjectsInRect(rect);
			this._camera.draw(toDraw);
		}
	}
	
	click(x, y) {
		const point   = this._camera.getWorldPoint(x, y);
		const clicked = this._world.getSubjectAtPoint(point.x, point.y);
		if ( clicked ) {
			clicked.click();
		}
	}
	
}

QQ.Application.get().addSeizure('Levels', Levels);
