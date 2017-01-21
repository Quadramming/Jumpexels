QQ.seizures.add('MainMenu', class MainMenu {
	
	constructor(app) {
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, 0);
		this._world.addBackground('img/backgrounds/menu.png');
		
		const text = new QQ.Text('JUMPEXELS', 0, 15, 3);
		this._world.addSubject(text);
		
		const logo = new QQ.Subject('img/logo.png', 10, 10);
		logo.click = () => QQ.seizures.set('Levels');
		logo.setPosition(0, 6);
		this._world.addSubject(logo);
		
		const play = new QQ.Subject('img/buttons/long.png', 15, 5);
		play.click = () => QQ.seizures.set('Levels');
		play.setPosition(0, 0);
		this._world.addSubject(play);
		const playText = new QQ.Text('PLAY', 0, 0, 2);
		this._world.addSubject(playText);
		
		const intro = new QQ.Subject('img/buttons/long.png', 15, 5);
		intro.click = () => QQ.seizures.set('Intro');
		intro.setPosition(0, -6);
		this._world.addSubject(intro);
		const introText = new QQ.Text('INTRO', 0, -6, 2);
		this._world.addSubject(introText);
		
		const credits = new QQ.Subject('img/buttons/long.png', 15, 5);
		credits.click = () => QQ.seizures.set('Credits');
		credits.setPosition(0, -12);
		this._world.addSubject(credits);
		const creditsText = new QQ.Text('CREDITS', 0, -12, 2);
		this._world.addSubject(creditsText);
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
