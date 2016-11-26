//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global QQ */
'use strict';

class Credits {
	
    constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		
		this._world.addBackground( new QQ.Subject('img/credits.png') );
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

	click(x, y) {
		this._myApp.setSeizure('MainMenu');
	}
	
}

QQ.Application.get().addSeizure('Credits', Credits);