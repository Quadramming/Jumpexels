'use strict';

var QQ = QQ || {};

QQ.Application = function () {

	function init() {
		QQ.Sprite.setContext(canvas.getContext());
		fpsCounter.showDetails();
		self.setSeizure('MainMenu');
		
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
	
	this.setSeizure = function(newSeizure, input) {
		seizure = loading;
		QQ.includer.js('js/seizures/'+newSeizure+'/'+newSeizure+'.js');
		QQ.includer.onLoad(function() {
			seizure = new QQ.seizures[newSeizure](canvas.getCanvas(), input);
		});
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
		//fpsCounter.show(canvas.getContext());
	}
	
	//================================
	// Private vars
	//================================
	
	var self       = this;
	var canvas     = new QQ.Canvas('appCanvas', 600, 800);
	var fpsCounter = new QQ.FpsCounter();
	var time       = new QQ.Time();
	var seizure    = null;
	var mouse      = new QQ.Mouse();
	var touch      = new QQ.Touch(mouse);
	var loading    = new QQ.seizures.Loading(canvas.getCanvas());
	
	init(); 
};