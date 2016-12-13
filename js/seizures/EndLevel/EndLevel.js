//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('EndLevel', class EndLevel {

	constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/dialog.png');
	}

	tick() {
	}

	draw() {
		if ( this._camera ) {
			const rect   = this._camera.getViewRect();
			const toDraw = this._world.getSubjectsInRect(rect);
			this._camera.draw(toDraw);
		}
		const ctx = this._myApp.getContext();
		ctx.textBaseline = 'middle';
		ctx.textAlign    = 'center';
		ctx.fillStyle    = 'black';
		ctx.font         = '60px KenPixel';
		ctx.fillText('Congratulations', 300, 175);
		ctx.font         = '40px KenPixel';
		ctx.fillText('You have won!', 300, 250);
		ctx.font         = '30px KenPixel';
		ctx.fillText('Click to continue', 300, 350);
	}

	click() {
		this._click = true;
	}

	clickUp() {
		if ( this._click ) {
			QQ.seizures.closePopUp();
			QQ.seizures.set('Levels');
		}
	}

});