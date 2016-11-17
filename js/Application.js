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
	
	this.addSeizure = function(name, newSeizure) {
		seizures[name] = newSeizure;
	};
	
	this.setSeizure = function(newSeizure, input) {
		seizure = loading;
		QQ.Includer.js('js/seizures/'+newSeizure+'/'+newSeizure+'.js');
		QQ.Includer.onLoad(function() {
			seizure = new seizures[newSeizure](canvas.getCanvas(), input);
		});
	};
	
	//================================
	// Private methods
	//================================

	function process(time) {
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
	var canvas     = new QQ.Canvas('appCanvas', 600, 800);
	var fpsCounter = new QQ.FpsCounter();
	var time       = new QQ.Time();
	var mouse      = new QQ.Mouse();
	var touch      = new QQ.Touch(mouse);
	var loading    = new QQ.LoadingSeizure(canvas.getCanvas());
	var seizure    = loading;
	var seizures   = [];
	
	init(); 
};

QQ.Application.get = function() {
	if ( ! QQ.Application.instance ) {
		QQ.Application.instance = new QQ.Application;
	}
	return QQ.Application.instance;
};
