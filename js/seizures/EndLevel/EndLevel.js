//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('EndLevel', class EndLevel {

	constructor(app, level) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/dialog.png');
		
		let text = new QQ.Text('Congratulations', 0, 12, 1);
		this._world.addSubject(text);
		text = new QQ.Text('You have won!', 0, 10, 1);
		this._world.addSubject(text);
		
		const myLevelIndex   = QQ.levelsOrder.indexOf(level);
		const nextLevelIndex = myLevelIndex + 1;
		if ( nextLevelIndex < QQ.levelsOrder.length ) {
			const nextName = QQ.levelsOrder[nextLevelIndex];
			const next     = new QQ.Subject('img/next.png', 5, 5);
			next.setPosition(-6, 6);
			next.click = () => {
				QQ.seizures.closePopUp();
				QQ.seizures.set('Game', QQ.levels[nextName], nextName);
			};
			this._world.addSubject(next);
		}
		
		const rst1    = new QQ.Subject('img/restart.png', 5, 5);
		rst1.setPosition(0, 6);
		rst1.click = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.reset();
		};
		this._world.addSubject(rst1);
		
		const levels = new QQ.Subject('img/exit.png', 5, 5);
		levels.setPosition(6, 6);
		levels.click = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.set('Levels');
		};
		this._world.addSubject(levels);
	}

	tick() {
	}

	draw() {
		const rect   = this._camera.getViewRect();
		const toDraw = this._world.getSubjectsInRect(rect);
		this._camera.draw(toDraw);
	}

	click() {
		this._click = true;
	}

	clickUp(x, y) {
		const point   = this._camera.getWorldPoint(x, y);
		const clicked = this._world.getSubjectAtPoint(point.x, point.y);
		if ( clicked && this._click ) {
			clicked.click();
		}
		this._click = false;
		/*
		if ( this._click ) {
			QQ.seizures.closePopUp();
			QQ.seizures.set('Levels');
		}
		*/
	}

});