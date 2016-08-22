//================================================================
// Name: Canvas
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


function Canvas(id, w, h) {
	
	function init() {
		calcSize();
		canvas                = document.createElement('canvas');
		canvas.id             = id;
		canvas.style.position = 'absolute';
		context               = canvas.getContext('2d');
		calcCanvasSize();
		document.body.appendChild(canvas);
		window.addEventListener('resize', function() {
				self.resize();
			});
	};
	
	//================================
	// Public methods
	//================================
	
	this.getWidth   = function() { return width;   };
	this.getHeight  = function() { return height;  };
	this.getUt      = function() { return ut;      };
	this.getCanvas  = function() { return canvas;  };
	this.getContext = function() { return context; };
	this.getScale   = function() { return scale;   };
	
	this.resize = function() {
		calcSize();
		calcCanvasSize();
	};
	
	this.drawBorder = function() {
		context.setTransform(1, 0, 0, 1, 0, 0, 0);
		context.beginPath();
		context.rect(0, 0, width, height);
		context.lineWidth   = ut;
		context.strokeStyle = 'black';
		context.stroke();
	};
	
	this.remove = function() {
		document.body.removeChild(canvas);
	};
	
	//================================
	// Private methods
	//================================

	function calcSize() {
		if ( fullscreen ) {
			width  = window.innerWidth;
			height = window.innerHeight;
			scale  = 1;
			ut     = width / 100;
		} else {
			width  = w;
			height = h;
			if ( window.innerWidth < width ) {
				height = Math.floor( height * (window.innerWidth / width) );
				width  = Math.floor(window.innerWidth );
			} 
			if ( window.innerHeight < height ) {
				width  = Math.floor( width * (window.innerHeight / height) );
				height = Math.floor( window.innerHeight );
			}
			scale = width / w;
			ut    = width / 100;
		}
	}
	
	function calcCanvasSize() {
		canvas.width      = width;
		canvas.height     = height;
		canvas.style.left = (window.innerWidth/2  - width/2)  + 'px';
		canvas.style.top  = (window.innerHeight/2 - height/2) + 'px';
		context.font      = 'bold ' + Math.floor(20 * self.getScale()) + 'px sans-serif';
	}
	
	//================================
	// Private vars
	//================================
	
	var self       = this;
	var fullscreen = (w === undefined || h === undefined);
	var width      = null;
	var height     = null;
	var scale      = 1;
	var ut         = null;
	var canvas     = null;
	var context    = null;
	
	init(); 
};
