QQ.seizures.add('GameHud', class GameHud
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		this._camera.init(30, 40, 0, 0);
		
		const back = new QQ.Subject('img/buttons/back.png', 5, 5);
		back.setPosition(-12, 17);
		back.click = () => {
			this._prevent = true;
			QQ.seizures.popUp('Pause');
		};
		this._world.addSubject(back);
	}
	
});