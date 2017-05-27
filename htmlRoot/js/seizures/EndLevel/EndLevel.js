game.seizures.EndLevel = class EndLevel
	extends QQ.Seizures.Base
{
	
	constructor(app, level) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/dialog.png');
		
		let text = new QQ.Text(
				app, 'Congratulations\n\nYou have won!',
				0, 13, 
				1.3
			);
		this._world.addSubject(text);
		
		const myLevelIndex   = game.levelsOrder.indexOf(level);
		const nextLevelIndex = myLevelIndex + 1;
		if ( nextLevelIndex < game.levelsOrder.length ) {
			const nextName = game.levelsOrder[nextLevelIndex];
			const next     = new QQ.Subject.Sprite(
					app,
					'img/buttons/forward.png',
					5, 5
				);
			next.setPosition(-6, 6);
			next.click = () => {
				app.sz().closePopUp();
				app.sz().set('Game', {
					cfg:  game.levels[nextName],
					name: nextName
				});
			};
			this._world.addSubject(next);
		}
		
		const restart = new QQ.Subject.Sprite(
				app,
				'img/buttons/restart.png',
				5, 5
			);
		restart.setPosition(0, 6);
		restart.click = () => {
			app.sz().closePopUp();
			app.sz().reset();
		};
		this._world.addSubject(restart);
		
		const levels = new QQ.Subject.Sprite(
				app,
				'img/buttons/exit.png',
				5, 5
			);
		levels.setPosition(6, 6);
		levels.click = () => {
			app.sz().closePopUp();
			app.sz().set('Levels');
		};
		this._world.addSubject(levels);
	}
	
};

QQ.Seizures.register.set('EndLevel', game.seizures.EndLevel);
