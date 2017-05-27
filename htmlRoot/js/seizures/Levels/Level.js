game.seizures.Levels.Level = class Level extends QQ.Subject.Sprite {
	
	constructor(app, x, y, name, text, status) {
		super(app, 'img/buttons/level.png', 5, 5);
		this._name        = name;
		this._status      = status;
		this.setPosition(x, y);
		this._spriteCheck = null;
		if ( status === Level.status.DONE ) {
			this._spriteCheck = new QQ.Sprite(
				app._imgManager.get('img/check.png')
			);
		} else if ( status === Level.status.CLOSED ) {
			this._spriteCheck = new QQ.Sprite(
				app._imgManager.get('img/cross.png')
			);
		}
		this._text = new QQ.Text(app, text);
		this._text.setLineHeight(30);
	}
	
	click() {
		const isOpen = (this._status === Level.status.OPEN);
		const isDone = (this._status === Level.status.DONE);
		if ( isOpen || isDone ) {
			this._app.sz().set('Game', {
				cfg:  game.levels[this._name],
				name: this._name
			});
		}
	}
	
	draw() {
		super.draw();
		if ( this._spriteCheck ) {
			this._spriteCheck.draw(this._app.getContext());
		}
		this._text.draw();
	}
	
};

game.seizures.Levels.Level.status = {
	DONE:   0,
	OPEN:   1,
	CLOSED: 2
};
