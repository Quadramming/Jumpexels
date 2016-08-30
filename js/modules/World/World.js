//================================================================
// Name: World
// Version: 16..
// 
// Interface:
// 
//================================================================

function World() {
	
	function init() {
	};
	
	//================================
	// Public methods
	//================================

	this.tick = function(delta) {
		for ( var i in this.subjects ) {
			this.subjects[i].tick(delta);
		}
	};
	
	this.draw = function(delta) {
		if ( camera ) {
			var rect   = camera.getViewRect();
			var toDraw = getSubjectsInRect(rect);
			camera.draw(toDraw);
		}
	};
	
	//================================
	// Private methods
	//================================

	function getSubjectsInRect(rect) {
		var result = [];
		for ( var i in this.subjects ) {
			var subj = this.subjects[i];
			if ( subj.isInRect(rect) ) {
				result.push(subj); 
			}
		}
		return result;
	};
		
	//================================
	// Private vars
	//================================
	
	var self     = this;
	var subjects = [];
	var camera   = null;
	var physics  = null; // ?
	
	init(); 
};