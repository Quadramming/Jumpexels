function Application() {
	
	function init() {
		canvas     = new Canvas('appCanvas', 600, 800);
		fpsCounter = new FpsCounter();
		fpsCounter.showDetails();
		time       = new Time();
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
		/*
		if ( seizure ) {
			seizure.process(delta);
		}
		*/
	}

	function draw() {
		/*
		if ( seizure ) {
			seizure.draw();
		}
		*/
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
	
	init(); 
};