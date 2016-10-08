//================================================================
// Name: QQ.Value
// Version: 16.08.25
// 
// Interface: (TODO)
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Value = function(input) {
	this.val = (input === undefined) ? 0 : input;
};

QQ.Value.prototype.clear = function() { 
	this.val = 0;
};

QQ.Value.prototype.invert = function() {
	this.val *= -1;
};

QQ.Value.prototype.v = function(input) {
	if ( input !== undefined && input !== null ) {
		this.val = input;
	}
	return this.val;
};

QQ.Value.prototype.isClear = function() {
	return this.val === 0;
};
