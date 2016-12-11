//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Seizures.SeizureLevels = class SeizureLevels {
	
	constructor(app) {
		this._myApp       = app;
		this._camera      = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._camera.setClip(0, 0, 0, -55);
		this._world       = new QQ.World();
		this._world.addBackground('img/backgrounds/tmpMenu.png');
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
		if ( this._clickStart ) {
			if ( ! this._camera.isScrolling() ) {
				const point   = this._camera.getWorldPoint(x, y);
				const clicked = this._world.getSubjectAtPoint(point.x, point.y);
				if ( clicked ) {
					clicked.click();
				}
			}
			this._clickStart = false;	
		}
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
		this._world.addSubject(
				new	SeizureLevels.Level(n, x, y)
			);
	}
	
};

QQ.Seizures.SeizureLevels.Level = class Level extends QQ.Subject {
	
	constructor(n, x, y) {
		super('img/level.png', 5, 5);
		this._levelN = n;
		this.setPosition(x, y);
	}
	
	click() {
		QQ.seizures.set('Game', QQ.levels[this._levelN]);
	}
	
	draw() {
		super.draw();
		var context = this._sprite.getContext();
		context.textBaseline = 'middle';
		context.textAlign    = 'center';
		context.fillStyle    = 'black';
		context.font         = '15px KenPixel';
		context.fillText('level', 0, -15);
		context.font         = '25px KenPixel';
		context.fillText(this._levelN, 0, 10);
	}
	
};

QQ.seizures.add('Levels', QQ.Seizures.SeizureLevels);
