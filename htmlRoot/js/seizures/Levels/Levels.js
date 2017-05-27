game.seizures.Levels = class Levels
	extends QQ.Seizures.Base
{
	
	constructor(app) {
		super(app);
		this._camera.init(30, 40, 0, 0);
		this._camera.setClip(0, 0, 0, 0);
		
		this._world.addBackground('img/backgrounds/menu.png');
		this._clickStart  = false;
		this._openedMax   = 3;
		this._opened      = 0;
		this._addLevels();
		
		const intro = new QQ.Subject.Sprite(app, 'img/buttons/back.png', 5, 5);
		intro.click = () => app.sz().set('Main');
		intro.setPosition(0, 17);
		this._world.addSubject(intro);
	}
	
	tick(delta) {
		this.tickScroll();
	}
	
	_addLevels() {
		const stepY  = 7;
		const stepX  = 7;
		const startY = 10;
		const startX = -stepX * 1.5;
		const perRow = 4;
		const n      = game.levelsOrder.length;
		const rows   = Math.ceil(n / perRow);
		let   level  = 0;
		for ( let row = 0; row < rows; ++row ) {
			for ( let i = 0; i < perRow && level < n; ++i ) {
				++level;
				this._addLevel(
					startX + i*stepX,
					startY - stepY*row,
					game.levelsOrder[level-1],
					level
				);
			}
		}
	}
	
	_addLevel(x, y, name, text) {
		const state  = this._app.storage('level' + name);
		const s      = Levels.Level.status;
		let   status = s.OPEN;
		if ( state === 'DONE' ) {
			status = s.DONE;
		} else {
			if ( this._opened < this._openedMax ) {
				++this._opened;
			} else {
				status = s.CLOSED;
			}
		}
		this._world.addSubject(
			new	Levels.Level(this._app, x, y, name, text, status)
		);
	}
	
};

QQ.Seizures.register.set('Levels', game.seizures.Levels);
