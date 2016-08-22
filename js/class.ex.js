//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

function newClass(input) {
	
	function init() {
		// this - is "window"
		alert("init " + private + " " + input);
	};
	
	//================================
	// Public methods
	//================================

	this.oMethod = function() {
		// this - is me
		alert("open method " + private);
		cMethod();
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is "window"
		// Use self.oMethod()
		alert("close method " + private);
	};
		
	//================================
	// Private vars
	//================================
	
	var self    = this;
	var private = "private var";
	
	init(); 
};