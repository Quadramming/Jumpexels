//================================================================
// Name: QQ
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global QQ */
'use strict';

QQ.LoadingSeizure = class {

	constructor(app) {
		this._world   = new QQ.World();
		this._camera  = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._world.addBackground( new QQ.Subject('img/loading.png') );
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
