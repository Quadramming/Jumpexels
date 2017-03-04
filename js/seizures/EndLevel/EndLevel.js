QQ.seizures.add('EndLevel', class EndLevel
	extends QQ.Seizures.SeizureBase
{
	
	constructor(level) {
		super();
		this._camera.init(30, 40, 0, 0);
		this._click  = false;
		this._world.addBackground('img/dialog.png');
		
		let text = new QQ.Text('Congratulations\n\nYou have won!', 0, 13, 1.3);
		this._world.addSubject(text);
		
		const myLevelIndex   = QQ.levelsOrder.indexOf(level);
		const nextLevelIndex = myLevelIndex + 1;
		if ( nextLevelIndex < QQ.levelsOrder.length ) {
			const nextName = QQ.levelsOrder[nextLevelIndex];
			const next     = new QQ.Subject('img/buttons/forward.png', 5, 5);
			next.setPosition(-6, 6);
			next.click = () => {
				QQ.seizures.closePopUp();
				QQ.seizures.set('Game', {
					cfg:  QQ.levels[nextName],
					name: nextName
				});
			};
			this._world.addSubject(next);
		}
		
		const restart = new QQ.Subject('img/buttons/restart.png', 5, 5);
		restart.setPosition(0, 6);
		restart.click = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.reset();
		};
		this._world.addSubject(restart);
		
		const levels = new QQ.Subject('img/buttons/exit.png', 5, 5);
		levels.setPosition(6, 6);
		levels.click = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.set('Levels');
		};
		this._world.addSubject(levels);
	}
	
});