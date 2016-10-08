//================================================================
// Name: QQ.World
// Version: 16..
// 
// Interface:
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.World = function() {
	
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
		for ( var i in subjects ) {
			var subj = subjects[i];
			if ( QQ.Math.isIntersect(rect, subj.getRect()) ) {
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