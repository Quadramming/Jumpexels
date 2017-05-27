game.seizures.Pause = class Pause
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._world.addBackground('img/dialog.png');
		
		const back = new QQ.Subject.Sprite(app, 'img/buttons/next.png', 5, 5);
		back.setPosition(-6, 6);
		back.click = () => app.sz().closePopUp();
		this._world.addSubject(back);
		
		const restart = () => {
			app.sz().closePopUp();
			app.sz().reset();
		};
		const rst = new QQ.Subject.Sprite(app, 'img/buttons/restart.png', 5, 5);
		rst.setPosition(0, 6);
		rst.click = restart;
		this._world.addSubject(rst);
		
		const levels = new QQ.Subject.Sprite(app, 'img/buttons/exit.png', 5, 5);
		levels.setPosition(6, 6);
		levels.click = () => {
			app.sz().closePopUp();
			app.sz().set('Levels');
		};
		this._world.addSubject(levels);
		
		const text = new QQ.Text(app, 'Pause', 0, 11, 3);
		this._world.addSubject(text);
	}
	
};

QQ.Seizures.register.set('Pause', game.seizures.Pause);
