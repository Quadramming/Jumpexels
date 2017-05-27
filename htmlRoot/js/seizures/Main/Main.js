game.seizures.Main = class Main
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._world.addBackground('img/backgrounds/menu.png');
		
		const text = new QQ.Text(app, 'JUMPEXELS', 0, 15, 3);
		this._world.addSubject(text);
		
		const logo = new QQ.Subject.Sprite(app, 'img/logo.png', 10, 10);
		logo.click = () => app.sz().set('Levels');
		logo.setPosition(0, 6);
		this._world.addSubject(logo);
		
		const play = new QQ.Subject.Sprite(app, 'img/buttons/long.png', 15, 5);
		play.click = () => app.sz().set('Levels');
		play.setPosition(0, 0);
		this._world.addSubject(play);
		const playText = new QQ.Text(app, 'PLAY', 0, 0, 2);
		this._world.addSubject(playText);
		
		const intro = new QQ.Subject.Sprite(app, 'img/buttons/long.png', 15, 5);
		intro.click = () => app.sz().set('Intro');
		intro.setPosition(0, -6);
		this._world.addSubject(intro);
		const introText = new QQ.Text(app, 'INTRO', 0, -6, 2);
		this._world.addSubject(introText);
		
		const credits = new QQ.Subject.Sprite(
				app,
				'img/buttons/long.png',
				15, 5
			);
		credits.click = () => app.sz().set('Credits');
		credits.setPosition(0, -12);
		this._world.addSubject(credits);
		const creditsText = new QQ.Text(app, 'CREDITS', 0, -12, 2);
		this._world.addSubject(creditsText);
	}
	
};

QQ.Seizures.register.set('Main', game.seizures.Main);
