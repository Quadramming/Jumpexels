//================================================================
// Name: QQ.MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global QQ */
'use strict';

class MainMenu {
	
	constructor(app) {
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._world.addBackground( new QQ.Subject('img/backgrounds/tmpMenu.png') );
		
		const logo = new QQ.Subject('img/logo.png', 10, 10);
		logo.click = () => app.setSeizure('Levels');
		this._world.addSubject(logo);
		
		const title = new QQ.Subject('img/title.png', 20, 20/7);
		title.setPosition(0, 12);
		this._world.addSubject(title);
		
		const intro = new QQ.Subject('img/introBt.png', 10, 2);
		intro.click = () => app.setSeizure('Intro');
		intro.setPosition(0, 8);
		this._world.addSubject(intro);
		
		const credits = new QQ.Subject('img/creditsBt.png', 10, 2);
		credits.click = () => app.setSeizure('Credits');
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
	
}

QQ.Application.get().addSeizure('MainMenu', MainMenu);
