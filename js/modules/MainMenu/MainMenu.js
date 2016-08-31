//================================================================
// Name: MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================

function MainMenu(canvas) {
	
	function init() {
		camera = new Camera(canvas, 5, 5);
		world  = new World;
	};
	
	//================================
	// Public methods
	//================================

	this.tick = function(delta) {
		if ( world ) {
			world.tick(delta);
		}
	};
	
	this.draw = function() {
		if ( camera ) {
			var rect   = camera.getViewRect();
			var toDraw = world.getSubjectsInRect(rect);
			camera.draw(toDraw);
		}
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is 'window'
		// Use self.oMethod()
	};
		
	//================================
	// Private vars
	//================================
	
	var self    = this;
	var world   = null;
	var camera  = null;

	init(); 
};