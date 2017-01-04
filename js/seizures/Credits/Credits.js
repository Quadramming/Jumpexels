//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('Credits', class Credits {

	constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/credits.png');
		app._fpsCounter.showDetails(); // DEBUG
	}

	tick() {
	}

	draw() {
		if ( this._camera ) {
			const rect   = this._camera.getViewRect();
			const toDraw = this._world.getSubjectsInRect(rect);
			this._camera.draw(toDraw);
		}
	}

	click() {
		this._click = true;
	}

	clickUp() {
		if ( this._click ) {
			QQ.seizures.set('MainMenu');
		}
	}

});