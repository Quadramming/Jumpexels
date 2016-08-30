//================================================================
// Name: Object
// Version: 16..
// 
// Interface:
// 
//================================================================

function Subject(input) {
	
	function init() {
		// this - is 'window'
		alert('init ' + private + ' ' + input);
	};
	
	//================================
	// Public methods
	//================================

	this.isInRect = function(rect) {
		
	};
	
	this.draw = function() {
		if ( sprite ) {
			sprite.draw();
		}
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
	var sprite  = null;
	var physics = null;
	var pivot   = Subject.pivot.NONE;
	
	init(); 
};

Subject.pivot = {
	NONE         : 0,
	CENTER       : 1,
	LEFTTOP      : 2,
	CENTERBOTTOM : 3
};
