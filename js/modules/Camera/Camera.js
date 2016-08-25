//================================================================
// Name: Camera
// Version: 16..
// 
// Interface:
// 
//================================================================

function Camera(input) {
	
	function init(inX, inY, inWidth, inHeight) {
		x      = inX;
		y      = inY;
		width  = inWidth;
		height = inHeight;
	};
	
	//================================
	// Public methods
	//================================

	this.oMethod = function() {
		// this - is me
		alert('open method ' + private);
		cMethod();
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is 'window'
		// Use self.oMethod()
		alert('close method ' + private);
	};
		
	//================================
	// Private vars
	//================================
	
	var self    = this;
	
	var x       = 0;
	var y       = 0;
	var width   = 0;
	var height  = 0;
	
	init(); 
};