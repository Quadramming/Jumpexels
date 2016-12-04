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
		this._myApp       = app;
		this._camera      = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._camera.setClip(0, 0, 0, -55);
		this._world       = new QQ.World();
		this._world.addBackground( new QQ.Subject('img/backgrounds/tmpMenu.png') );
		this._addLevels(50);
		this._clickStart  = false;
	}
	
	tick(delta) {
		let mouse = this._myApp.getMouseXY();
		let m1    = this._myApp.isM1Pressed() && this._clickStart;
		this._camera.tickScroll(mouse.x, mouse.y, m1);
		this._world.tick(delta);
	}
	
	draw() {
		if ( this._camera ) {
			const rect   = this._camera.getViewRect();
			const toDraw = this._world.getSubjectsInRect(rect);
			this._camera.draw(toDraw);
		}
	}
	
	click() {
		this._clickStart = true;
	}
	
	clickUp(x, y) {
		if ( ! this._clickStart ) {
			return;
		}
		if ( ! this._camera.isScrolling() ) {
			const point   = this._camera.getWorldPoint(x, y);
			const clicked = this._world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
		}
		this._clickStart = false;
	}
	
	_addLevels(n) {
		let perRow = 4;
		let rows   = Math.ceil(n / perRow);
		let stepY  = 7;
		let stepX  = 7;
		let startY = 14;
		let startX = -stepX * 1.5;
		let level  = 1;
		for ( let row = 0; row < rows; ++row ) {
			for ( let i = 0; i < perRow; ++i ) {
				this._addLevel(startX + i*stepX, startY - stepY*row, level);
				if ( level === n ) {
					return;
				}
				++level;
			}
		}
	}
	
	_addLevel(x, y, n) {
		let level = new QQ.Subject('img/level.png', 5, 5);
		level.setPosition(x, y);
		level.click = function() {
			QQ.Application.get().setSeizure('Game', n);
		};
		level.setExtraDraw(function() {
			QQ.Sprite.context.textBaseline = 'middle';
			QQ.Sprite.context.textAlign    = 'center';
			QQ.Sprite.context.fillStyle    = 'black';
			QQ.Sprite.context.font         = '15px KenPixel';
			QQ.Sprite.context.fillText('level', 0, -15);
			QQ.Sprite.context.font         = '25px KenPixel';
			QQ.Sprite.context.fillText(n, 0, 10);
		});
		this._world.addSubject(level);
	}
	
}

QQ.Application.get().addSeizure('Levels', Levels);
