'use strict';

QQ.Application = class Application {

	constructor() {
		this._canvas     = new QQ.Canvas('appCanvas', 600, 800);
		this._fpsCounter = new QQ.FpsCounter();
		this._time       = new QQ.Time();
		this._mouse      = new QQ.Mouse();
		this._touch      = new QQ.Touch(this._mouse);
		this._skipFrames = 0;
		this._frame      = 0;
	}
	
	init() {
		QQ.Sprite.setContext(this._canvas.getContext());
		QQ.Hud.canvasRatio(this._canvas.getRatio());
		this._fpsCounter.showDetails();
		QQ.seizures.set('MainMenu');
		
		this._mouse.setM1DownCB( () => {
				if ( this._isMouseInCanvas() ) {
					let {x, y} = this._getMousePosition();
					QQ.seizures.click(x, y);
				}
			});
			
		this._mouse.setM1UpCB( () => {
				if ( this._isMouseInCanvas() ) {
					let {x, y} = this._getMousePosition();
					QQ.seizures.clickUp(x, y);
				}
			});
		this._process();
	}
	
	pause() {
		QQ.seizures.popUp('Pause');
	}
	
	getCanvas() {
		return this._canvas.getCanvas();
	}
	
	getContext() {
		return this._canvas.getContext();
	}
	
	isM1Pressed() {
		return this._mouse.getM1();
	}
	
	getMouseXY() {
		if ( this._isMouseInCanvas() ) {
			return this._getMousePosition();
		}
		return { x: -1, y: -1 };
	}
	
	getTime() {
		return this._time;
	}
	
	_getMousePosition() {
		let canvas = this._canvas.getCanvas();
		let x      = this._mouse.getX() - canvas.offsetLeft;
		let y      = this._mouse.getY() - canvas.offsetTop;
		return {x, y};
	}
	
	_isMouseInCanvas() {
		let canvas = this._canvas.getCanvas();
		let {x, y} = this._getMousePosition();
		let isHitX = 0 < x && x < canvas.width;
		let isHitY = 0 < y && y < canvas.height;
		return isHitX && isHitY;
	}
	
	_process(time) {
		requestAnimationFrame(this._process.bind(this));
		this._frame = ++this._frame % (this._skipFrames+1);
		if ( this._frame === 0 ) {
			this._tick();
			this._draw();
		}
	}
	
	_tick() {
		let delta = this._time.update();
		this._fpsCounter.tick(delta);
		QQ.seizures.tick(delta);
	}

	_draw() {
		QQ.seizures.draw();
		//this._canvas.drawBorder();
		this._fpsCounter.show(this._canvas.getContext());
	}

};

/*
QQ.Application.get = function() {
	if ( ! QQ.Application.instance ) {
		QQ.Application.instance = new QQ.Application;
	}
	return QQ.Application.instance;
};
*/