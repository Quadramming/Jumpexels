'use strict';

(function(globals) {
	var globalsAtStart = Object.keys(window);
	
	globals.QQ           = globals.QQ || {};
	globals.QQ.Debug     = {
		log : function(str) {
			console.log(str);
		},
		getCreatedGlobals : function() {
			var globalsNow = Object.keys(window);
			this.log(
				globalsNow.filter(function(x) { return globalsAtStart.indexOf(x) < 0; })
			);
		}
	};

	globals.c = function(str) {
		globals.QQ.Debug.log(str);
	};

})(window);

c('Using QQ.Debug:');
c('function c(str) - Quick log');
c('function QQ.Debug.getCreatedGlobals() - Get created global vars');