//================================================================
// Name: QQ.MainMenu
// Version: 16..
// 
// Interface:
// 
//================================================================

QQ.MainMenu = function(canvas) {
	
	function init() {
		camera = new QQ.Camera(canvas, 5, 5);
		world  = new QQ.World;
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