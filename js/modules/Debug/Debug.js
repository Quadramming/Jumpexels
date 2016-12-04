'use strict';

window.QQ           = window.QQ || {};
window.QQ.Debug     = {
	
	initGlobals: Object.keys(window),
	
	log(str) {
		console.log(str);
	},
	
	getCreatedGlobals() {
		let globalsNow = Object.keys(window);
		let diff       = globalsNow.filter(function(x) { 
				return window.QQ.Debug.initGlobals.indexOf(x) < 0; 
			});
		diff.push('QQ');
		return diff;
	}
};

window.c = function(str) {
	window.QQ.Debug.log(str);
};

c('Using QQ.Debug:');
c('function c(str) - Quick log');
c('function QQ.Debug.getCreatedGlobals() - Get created global vars');