QQ.Seizures.SeizureLevels = class SeizureLevels
	extends QQ.Seizures.SeizureBase
{
	
	constructor() {
		super();
		this._camera.init(30, 40, 0, 0);
		this._camera.setClip(0, 0, 0, 0);
		
		this._world.addBackground('img/backgrounds/menu.png');
		this._clickStart  = false;
		this._openedMax   = 3;
		this._opened      = 0;
		this._addLevels();
		
		const intro = new QQ.Subject('img/buttons/back.png', 5, 5);
		intro.click = () => QQ.seizures.set('Main');
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
		const n      = QQ.levelsOrder.length;
		const rows   = Math.ceil(n / perRow);
		let   level  = 0;
		for ( let row = 0; row < rows; ++row ) {
			for ( let i = 0; i < perRow && level < n; ++i ) {
				++level;
				this._addLevel(
					startX + i*stepX,
					startY - stepY*row,
					QQ.levelsOrder[level-1],
					level
				);
			}
		}
	}
	
	_addLevel(x, y, name, text) {
		const state  = this._app.storage('level' + name);
		const s      = QQ.Seizures.SeizureLevels.Level.STATUS;
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
			new	SeizureLevels.Level(x, y, name, text, status)
		);
	}
	
};

QQ.Seizures.SeizureLevels.Level = class Level extends QQ.Subject {
	
	constructor(x, y, name, text, status) {
		super('img/buttons/level.png', 5, 5);
		this._name        = name;
		this._status      = status;
		this.setPosition(x, y);
		this._spriteCheck = null;
		if ( status === Level.STATUS.DONE ) {
			this._spriteCheck = new QQ.Sprite( 
				QQ.imgManager.get('img/check.png')
			);
		} else if ( status === Level.STATUS.CLOSED ) {
			this._spriteCheck = new QQ.Sprite(
				QQ.imgManager.get('img/cross.png')
			);
		}
		this._text = new QQ.Text(text);
		this._text.setLineHeight(30);
	}
	
	click() {
		const isOpen = this._status === Level.STATUS.OPEN;
		const isDone = this._status === Level.STATUS.DONE;
		if ( isOpen || isDone ) {
			QQ.seizures.set('Game', {
				cfg:  QQ.levels[this._name],
				name: this._name
			});
		}
	}
	
	draw() {
		super.draw();
		if ( this._spriteCheck ) {
			this._spriteCheck.draw();
		}
		this._text.draw();
	}
	
};

QQ.Seizures.SeizureLevels.Level.STATUS = {
	DONE:   0,
	OPEN:   1,
	CLOSED: 2
};

QQ.seizures.add('Levels', QQ.Seizures.SeizureLevels);
