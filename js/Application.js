'use strict';

var QQ = QQ || {};

QQ.Application = function () {

	function init() {
		canvas     = new QQ.Canvas('appCanvas', 600, 800);
		QQ.Sprite.setContext(canvas.getContext());
		fpsCounter = new QQ.FpsCounter();
		fpsCounter.showDetails();
		time       = new QQ.Time();
		seizure    = new QQ.MainMenu(canvas.getCanvas());
		
		mouse.setM1DownCB( function() {
				var x = (mouse.getX() - canvas.getCanvas().offsetLeft);
				var y = (mouse.getY() - canvas.getCanvas().offsetTop);
				var isHitX = 0 < x && x < canvas.getCanvas().width;
				var isHitY = 0 < y && y < canvas.getCanvas().height;
				if ( isHitX && isHitY ) {
					seizure.click(x, y);
				}
			});
		process();
	};
	
	//================================
	// Public methods
	//================================
	
	this.oMethod = function() {
	};
	
	//================================
	// Private methods
	//================================

	function process() {
		requestAnimationFrame(process);
		tick();
		draw();
	};
	
	function tick() {
		var delta = time.update();
		fpsCounter.tick(delta);
		if ( seizure ) {
			seizure.tick(delta);
		}
	}

	function draw() {
		if ( seizure ) {
			seizure.draw();
		}
		canvas.drawBorder();
		fpsCounter.show(canvas.getContext());
	}
	
	//================================
	// Private vars
	//================================
	
	var self       = this;
	var canvas     = null;
	var fpsCounter = null;
	var time       = null;
	var seizure    = null;
	var mouse      = new QQ.Mouse();
	var touch      = new QQ.Touch(mouse);
	
	init(); 
};