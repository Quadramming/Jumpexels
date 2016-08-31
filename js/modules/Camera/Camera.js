//================================================================
// Name: Camera
// Version: 16..
// 
// Interface:
// 
//================================================================

function Camera(inCanvas, inWidth, inHeight) {
	
	function init() {
		width  = inWidth;
		height = inHeight;
		canvas = inCanvas;
	};
	
	//================================
	// Public methods
	//================================

	this.draw = function(subjects) {
		cleanCanvas();
		for ( var i in subjects ) {
			var subj = subjects[i];
			subj.draw();
		}
	};
	
	this.getViewRect = function() {
		return {x: 0, y: 0, w: 1, h: 2};
	};
	
	//================================
	// Private methods
	//================================
	
	function cleanCanvas() {
		var ctx       = canvas.getContext("2d");
		ctx.fillStyle = "gray";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	//================================
	// Private vars
	//================================
	
	var self    = this;
	var x       = 0;
	var y       = 0;
	var width   = 0;
	var height  = 0;
	var canvas  = null;
	
	init(); 
};