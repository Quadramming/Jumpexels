//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('Intro', class Intro {
	
	constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, -14);
		this._camera.setClip(0, 0, -14, -66);
		this._world.addBackground('img/backgrounds/tmpMenu.png');
		
		let intro = new QQ.Subject('img/intro.png', 30, 80);
		intro.setPosition(0, 0, QQ.Math.pivot.CENTERTOP);
		this._world.addSubject(intro);
		
		this._addBackButton(0,   0, QQ.Math.pivot.CENTERBOTTOM);
		this._addBackButton(0, -80, QQ.Math.pivot.CENTERTOP);
	}
	
	tick() {
		let mouse = this._myApp.getMouseXY();
		this._camera.tickScroll(mouse.x, mouse.y, this._myApp.isM1Pressed());
	}
	
	draw() {
		const rect   = this._camera.getViewRect();
		const toDraw = this._world.getSubjectsInRect(rect);
		this._camera.draw(toDraw);
	}
	
	clickUp(x, y) {
		if ( ! this._camera.isScrolling() ) {
			const point   = this._camera.getWorldPoint(x, y);
			const clicked = this._world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
		}
	}
	
	_addBackButton(x, y, pivot) {
		let back = new QQ.Subject('img/back.png', 5, 5);
		back.setPosition(x, y, pivot);
		back.click = () => QQ.seizures.set('MainMenu');
		this._world.addSubject(back);
	}
	
});
