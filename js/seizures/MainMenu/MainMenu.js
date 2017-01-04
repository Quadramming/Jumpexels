//================================================================
// Name: QQ.MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('MainMenu', class MainMenu {
	
	constructor(app) {
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._world.addBackground('img/backgrounds/tmpMenu.png');
		
		const logo = new QQ.Subject('img/logo.png', 10, 10);
		logo.click = () => QQ.seizures.set('Levels');
		this._world.addSubject(logo);
		
		
		const text = new QQ.Text('JUMPEXELS', 0, 14, 3);
		this._world.addSubject(text);
		
		const intro = new QQ.Subject('img/introBt.png', 10, 2);
		intro.click = () => QQ.seizures.set('Intro');
		intro.setPosition(0, 8);
		this._world.addSubject(intro);
		
		const credits = new QQ.Subject('img/creditsBt.png', 10, 2);
		credits.click = () => QQ.seizures.set('Credits');
		credits.setPosition(0, -12);
		this._world.addSubject(credits);		
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
	
	click(x, y) {
		const point   = this._camera.getWorldPoint(x, y);
		const clicked = this._world.getSubjectAtPoint(point.x, point.y);
		if ( clicked ) {
			clicked.click();
		}
	}
	
});
