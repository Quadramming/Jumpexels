//================================================================
// Name: Value
// Version: 16.08.25
// 
// Interface: (TODO)
// 
//================================================================

function Value(input) {
	this.val = (input === undefined) ? 0 : input;
};

Value.prototype.clear = function() { 
	this.val = 0;
};

Value.prototype.invert = function() {
	this.val *= -1;
};

Value.prototype.v = function(input) {
	if ( input !== undefined && input !== null ) {
		this.val = input;
	}
	return this.val;
};

Value.prototype.isClear = function() {
	return this.val === 0;
};
