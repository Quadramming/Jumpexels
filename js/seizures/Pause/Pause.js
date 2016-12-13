//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('Pause', class Pause {

	constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/dialog.png');
		
		const back = new QQ.Subject('img/logo.png', 15, 2);
		back.setPosition(0, 2);
		back.click = () => QQ.seizures.closePopUp();
		this._world.addSubject(back);
		
		const restart = new QQ.Subject('img/logo.png', 5, 5);
		restart.setPosition(-5, 6);
		restart.click = () => {QQ.seizures.closePopUp();QQ.seizures.reset();};
		this._world.addSubject(restart);
		
		const levels = new QQ.Subject('img/logo.png', 5, 5);
		levels.setPosition(5, 6);
		levels.click = () => {QQ.seizures.closePopUp();QQ.seizures.set('Levels');};
		this._world.addSubject(levels);
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
		ctx.fillText('Pause', 300, 175);
	}

	click() {
		this._click = true;
	}

	clickUp(x, y) {
		const point   = this._camera.getWorldPoint(x, y);
		const clicked = this._world.getSubjectAtPoint(point.x, point.y);
		if ( clicked ) {
			clicked.click();
		}
	}

});