//================================================================
// Name: QQ.Subject
// Version: 16..
// 
// Interface:
// 
//================================================================

/* global Matter */
'use strict';

QQ.Text = class Text extends QQ.Subject {
	
	constructor(text, x=0, y=0, size=1, fit=QQ.Text.fit.HEIGHT) {
		super(null, size, size);
		this.setPosition(x, y);
		this._fit        = fit;
		this._text       = text;
		this._ctx        = QQ.application.getContext();
		this._textHeight = 5;
		this._setupContext();
		this._textWidth  = this._ctx.measureText(this._text).width;
	}
	
	_setupContext() {
		this._ctx.textBaseline = 'middle';
		this._ctx.textAlign    = 'center';
		this._ctx.fillStyle    = '#878787';
		this._ctx.font         = this._textHeight + 'px courier new';
	}
	
	setTextHeight(h) {
		this._textHeight = h;
		this._setupContext();
		this._textWidth  = this._ctx.measureText(this._text).width;
	}
	
	getScale() {
		let scaleX, scaleY;
		if ( this._fit === Text.fit.WIDTH ) {
			scaleX = this._width  / this._textWidth;
			scaleY = this._height / this._textWidth;
		} else if ( this._fit === Text.fit.HEIGHT ) {
			scaleX = this._width  / this._textHeight;
			scaleY = this._height / this._textHeight;
		} else {
			scaleX = this._width  / this._textWidth;
			scaleY = this._height / this._textHeight;
		}
		return { x : scaleX, y : scaleY };
	}
	
	draw() {
		this._setupContext();
		this._ctx.fillText(this._text, 0, 0);
	}
	
};

QQ.Text.fit = {
	WIDTH         : 0,
	HEIGHT        : 1,
	BOTH          : 2
};
