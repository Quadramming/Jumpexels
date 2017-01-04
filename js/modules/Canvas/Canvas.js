//================================================================
// Name: QQ.Canvas
// Version: 16.08.19
// 
// Interface:
//
// Canvas(id, w, h);
//   id - DOM id of canvas
//   w  - width (max)
//   h  - height (max)
//   Canvas will be fit in window. 
//   If w or h is undefined canvas will be fullscreened.
//
// getWidth();
//   Get width.
// 
// getHeight();
//   Get height.
// 
// getUt();
//   Get 1 UniT (1% from height).
// 
// getCanvas();
//   Get canvas.
// 
// getContext();
//   Get context.
// 
// getScale();
//   Get scale.
//
// resize();
//   Resize canvas after window resize.
//   
// drawBorder();
//   Draw border of canvas.
//
// remove();
//   Remove canvas element from DOM.
//================================================================

'use strict';

QQ.Canvas = class Canvas {
	
	constructor(id, initW, initH, maximize = false) {
		this._maximize   = maximize;
		this._fullscreen = (initW === undefined || initH === undefined);
		this._width      = null;
		this._w          = initW;
		this._height     = null;
		this._h          = initH;
		this._scale      = 1;
		this._ut         = null;
		this._canvas     = document.createElement('canvas');
		this._context    = this._canvas.getContext('2d');
		
		this._canvas.id             = id;
		this._canvas.style.position = 'absolute';
		
		this._calcSize();
		document.body.appendChild(this._canvas);
		window.addEventListener('resize', () => this.resize() );
		
		this._context.imageSmoothingEnabled = true;
	}
	
	getWidth() { 
		return this._width;
	}
	
	getHeight() { 
		return this._height;
	}
	
	getUt() { 
		return this._ut;
	}
	
	getCanvas() { 
		return this._canvas;
	}
	
	getContext() { 
		return this._context;
	}
	
	getScale() { 
		return this._scale;
	}
	
	getRatio() { 
		return this._width / this._height; 
	}
	
	resize() {
		this._calcSize();
	}
	
	drawBorder() {
		let context = this._context;
		context.setTransform(1, 0, 0, 1, 0, 0, 0);
		context.beginPath();
		context.rect(0, 0, this._width, this._height);
		context.lineWidth   = this._ut;
		context.strokeStyle = 'black';
		context.stroke();
	}
	
	remove() {
		document.body.removeChild(this._canvas);
	}
	
	_calcSize() {
		if ( this._fullscreen ) {
			this._width  = window.innerWidth;
			this._height = window.innerHeight;
			this._scale  = 1;
			this._ut     = this._width / 100;
		} else {
			if ( ! this._maximize ) {
				this._width  = this._w;
				this._height = this._h;
				if ( window.innerWidth < this._width ) {
					this._height = Math.floor( 
							this._height * (window.innerWidth / this._width) 
						);
					this._width  = Math.floor(window.innerWidth );
				} 
				if ( window.innerHeight < this._height ) {
					this._width  = Math.floor( 
							this._width * (window.innerHeight / this._height) 
						);
					this._height = Math.floor( window.innerHeight );
				}
				this._scale = this._width / this._w;
				this._ut    = this._width / 100;
			} else {
				let ratio = this._w/this._h;
				this._width     = window.innerWidth;
				this._height    = Math.floor(this._width/ratio);
				if ( window.innerHeight < this._height ) {
					this._height = window.innerHeight;
					this._width  = Math.floor(this._height*ratio);
				}
				this._scale = this._width / this._w;
				this._ut    = this._width / 100;
			}
		}
		this._calcCanvasSize();
	}
	
	_calcCanvasSize() {
		let canvas = this._canvas;
		canvas.width       = this._width;
		canvas.height      = this._height;
		canvas.style.left  = (window.innerWidth/2  - this._width/2)  + 'px';
		canvas.style.top   = (window.innerHeight/2 - this._height/2) + 'px';
		this._context.font = 'bold ' + 
							 Math.floor(20 * this.getScale()) + 'px' +
							 'defaultFont';
	}
	
};
