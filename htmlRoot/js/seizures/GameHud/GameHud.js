game.seizures.GameHud = class GameHud
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		
		const back = new QQ.Subject.Sprite(app, 'img/buttons/back.png', 5, 5);
		back.setPosition(-12, 17);
		back.click = () => {
			app.sz().popUp('Pause');
		};
		this._world.addSubject(back);
	}
	
};

QQ.Seizures.register.set('GameHud', game.seizures.GameHud);
