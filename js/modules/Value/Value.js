//================================================================
// Name: Value
// Version: 16.08.22
// 
// Interface:
// 
//================================================================

function Value(input) {
	this.val = (input === undefined) ? 0 : input;
}

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

//================================================================
// XY
//================================================================

function XY(inX, inY) {
	this.m_x = new Value(inX);
	this.m_y = new Value(inY);
}

XY.prototype.x = 
XY.prototype.X = 
XY.prototype.w = 
XY.prototype.W = 
XY.prototype.width = 
XY.prototype.Width = 
function(input) {
	return this.m_x.v(input);
};

XY.prototype.y = 
XY.prototype.Y = 
XY.prototype.h = 
XY.prototype.H = 
XY.prototype.height = 
XY.prototype.Height = 
function(input) {
	return this.m_y.v(input);
};

XY.prototype.clear = function() {
	this.m_x.clear();
	this.m_y.clear();
};

XY.prototype.set = function(inX, inY) {
	this.m_x.v(inX);
	this.m_y.v(inY);
};

XY.prototype.isClear = function() {
	return this.m_x.isClear() && this.m_y.isClear();
};

XY.prototype.clearX  = function() { this.m_x.clear();  };
XY.prototype.clearY  = function() { this.m_y.clear();  };
XY.prototype.invertX = function() { this.m_x.invert(); };
XY.prototype.invertY = function() { this.m_y.invert(); };
