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
		this._camera.setClip(0, 0, -14, -14);
		this._world.addBackground('img/backgrounds/menu.png');
		
		let intro = new QQ.Text('INTRO', 0, -4, 3);
		this._world.addSubject(intro);
		
		let text = new QQ.Text(this._getText(), 0, -7, 28, QQ.Text.fit.WIDTH);
		text.setAlign('left');
		text.setLineSpace(20);
		this._world.addSubject(text);
		
		this._addBackButton(0,   0, QQ.Math.pivot.CENTERBOTTOM);
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
		let back = new QQ.Subject('img/buttons/back.png', 5, 5);
		back.setPosition(x, y, pivot);
		back.click = () => QQ.seizures.set('MainMenu');
		this._world.addSubject(back);
	}
	
	_getText() {
		return `    Lots of animal living on earth. They like earth,
but all of them wants to live in SPACE ZOO.
Every year spaceship is comming to earth 
to get some animals to SPACE ZOO.
Only you can help them to get to it.
Help this little creatures to rech space ship.
Just tap on screen to help animals.
Thank you`;
	}
	
});
