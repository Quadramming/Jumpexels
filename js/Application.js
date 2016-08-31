function Application() {
	
	function init() {
		canvas     = new Canvas('appCanvas', 600, 800);
		Sprite.setContext(canvas.getContext());
		fpsCounter = new FpsCounter;
		fpsCounter.showDetails();
		time       = new Time;
		seizure    = new MainMenu(canvas.getCanvas());
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
			
	init(); 
};