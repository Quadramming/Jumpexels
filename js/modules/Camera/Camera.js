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

	this.draw = function(subjects) {
		for ( var i in subjects ) {
			var subj = subjects[i];
			subj.draw();
		}
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
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