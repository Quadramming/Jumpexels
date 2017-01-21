window.QQ           = window.QQ || {};
window.QQ.Debug     = {

	log(str) {
		console.log(str);
	}
	
};

window.c = function(str) {
	window.QQ.Debug.log(str);
};

c('Using QQ.Debug:');
c('function c(str) - Quick log');

// for ( let x of Object.getOwnPropertyNames(window) ) { console.log(x) };