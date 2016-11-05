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
	
	this.addBackground = function(subj) {
		background = subj;
	};
	
	this.addSubject = function(subj) {
		subjects.push(subj);
	};

	this.tick = function(delta) {
		for ( var i in subjects ) {
			subjects[i].tick(delta);
		}
	};
	
	//================================
	// Private methods
	//================================

	this.getSubjectsInRect = function(rect) {
		var result = [];
		if ( background !== null ) {
			background.fitInRect(rect);
			result.push(background);
		}
		for ( var i in subjects ) {
			var subj = subjects[i];
			if ( QQ.Math.isIntersect(rect, subj.getRect()) ) {
				result.push(subj); 
			}
		}
		return result;
	};
	
	this.getSubjectAtPoint = function(x, y) {
		for ( var i = subjects.length-1; i >= 0 ; --i ) {
			var subj = subjects[i];
			if ( QQ.Math.isInside(subj.getRect(), x, y) ) {
				return subj; 
			}
		}
	};
		
	//================================
	// Private vars
	//================================
	
	var self       = this;
	
	var subjects   = [];
	var background = null;
	
	var physics    = null; // ?
	
	init(); 
};