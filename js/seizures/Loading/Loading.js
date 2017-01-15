//================================================================
// Name: QQ
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Seizures.SeizureLoading = class SeizureLoading {

	constructor(app) {
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._world.addBackground('img/backgrounds/menu.png');
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

};
