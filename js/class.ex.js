var QQ = QQ || {};

QQ.newClass = function(input) {
	
	function init() {
		// this - is 'window'
		alert('init ' + _private + ' ' + input);
	};
	
	//================================
	// Public methods
	//================================

	this.oMethod = function() {
		// this - is me
		alert('open method ' + _private);
		cMethod();
	};
	
	//================================
	// Private methods
	//================================

	function cMethod() {
		// this - is 'window'
		// Use self.oMethod()
		alert('close method ' + _private);
	};
		
	//================================
	// Private vars
	//================================
	
	var self     = this;
	var _private = 'private var';
	
	init(); 
};