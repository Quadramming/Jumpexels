//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global QQ */
'use strict';

class Intro {
	
    constructor(app) {
		this._myApp    = app;
		
		this._isScroll = false;
		this._scrollX  = 0;
		this._scrollY  = 0;
		
		this._world    = new QQ.World();
		this._camera   = new QQ.Camera(app.getCanvas(), 30, 40, 0, -15);
		this._camera.setClip(0, 0, 0, -80);
		this._world.addBackground( new QQ.Subject('img/backgrounds/tmpMenu.png') );
		this._addBackButton(0, 0, QQ.Subject.pivot.CENTERBOTTOM);
		
		let intro = new QQ.Subject('img/intro.png', 30, 80);
		intro.setPosition(0, 0, QQ.Subject.pivot.CENTERTOP);
		this._world.addSubject(intro);
		
		this._addBackButton(0, -80, QQ.Subject.pivot.CENTERTOP);
    }
		
	tick() {
		let mouse = this._myApp.getMouseXY();
		if ( mouse.x === -1 ) {
			this._isScroll = false;
			return;
		}
		let position = this._camera.getWorldPoint(mouse.x, mouse.y);
		if ( this._myApp.isM1Pressed() && ! this._isScroll ) {
			this._isScroll = true;
			({x: this._scrollX, y: this._scrollY} = position);
		}
		if ( ! this._myApp.isM1Pressed() && this._isScroll ) {
			this._isScroll = false;
		}
		if ( this._isScroll ) {
			this._camera.addPos(this._scrollX-position.x, this._scrollY-position.y);
			let newPosition = this._camera.getWorldPoint(mouse.x, mouse.y);
			({x: this._scrollX, y: this._scrollY} = newPosition);
		}
	}
	
	draw() {
		const rect   = this._camera.getViewRect();
		const toDraw = this._world.getSubjectsInRect(rect);
		this._camera.draw(toDraw);
	}

	click(x, y) {
		const point   = this._camera.getWorldPoint(x, y);
		const clicked = this._world.getSubjectAtPoint(point.x, point.y);
		if ( clicked ) {
			clicked.click();
		}
	}
	
	_addBackButton(x, y, pivot) {
		let back = new QQ.Subject('img/back.png', 10, 2);
		back.setPosition(x, y, pivot);
		back.click = () => this._myApp.setSeizure('MainMenu');
		this._world.addSubject(back);
	}
	
}

QQ.Application.get().addSeizure('Intro', Intro);