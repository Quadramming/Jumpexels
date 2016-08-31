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
	
	this.addSubject = function(subj) {
		subjects.push(subj);
	};

	this.tick = function(delta) {
		for ( var i in this.subjects ) {
			this.subjects[i].tick(delta);
		}
	};
	
	//================================
	// Private methods
	//================================

	this.getSubjectsInRect = function(rect) {
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
	
	var physics  = null; // ?
	
	init(); 
};