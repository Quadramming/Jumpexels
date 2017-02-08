QQ.seizures.add('Pause', class Pause
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		this._camera.init(30, 40, 0, 0);
		this._world.addBackground('img/dialog.png');
		
		const back = new QQ.Subject('img/buttons/next.png', 5, 5);
		back.setPosition(-6, 6);
		back.click = () => QQ.seizures.closePopUp();
		this._world.addSubject(back);
		
		const restart = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.reset();
		};
		const rst1    = new QQ.Subject('img/buttons/restart.png', 5, 5);
		rst1.setPosition(0, 6);
		rst1.click = restart;
		this._world.addSubject(rst1);
		
		const levels = new QQ.Subject('img/buttons/exit.png', 5, 5);
		levels.setPosition(6, 6);
		levels.click = () => {
			QQ.seizures.closePopUp();
			QQ.seizures.set('Levels');
		};
		this._world.addSubject(levels);
		
		const text = new QQ.Text('Pause', 0, 11, 3);
		this._world.addSubject(text);
	}
	
});