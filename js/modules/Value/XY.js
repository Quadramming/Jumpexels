//================================================================
// Name: QQ.XY
// Version: 16.08.25
// 
// Interface: (TODO)
// 
//================================================================
'use strict';

var QQ = QQ || {};

QQ.XY = function(inX, inY) {
	this.m_x = new QQ.Value(inX);
	this.m_y = new QQ.Value(inY);
};

QQ.XY.prototype.x = 
QQ.XY.prototype.X = 
QQ.XY.prototype.w = 
QQ.XY.prototype.W = 
QQ.XY.prototype.width = 
QQ.XY.prototype.Width = 
function(input) {
	return this.m_x.v(input);
};

QQ.XY.prototype.y = 
QQ.XY.prototype.Y = 
QQ.XY.prototype.h = 
QQ.XY.prototype.H = 
QQ.XY.prototype.height = 
QQ.XY.prototype.Height = 
function(input) {
	return this.m_y.v(input);
};

QQ.XY.prototype.clear = function() {
	this.m_x.clear();
	this.m_y.clear();
};

QQ.XY.prototype.set = function(inX, inY) {
	this.m_x.v(inX);
	this.m_y.v(inY);
};

QQ.XY.prototype.isClear = function() {
	return this.m_x.isClear() && this.m_y.isClear();
};

QQ.XY.prototype.clearX  = function() { this.m_x.clear();  };
QQ.XY.prototype.clearY  = function() { this.m_y.clear();  };
QQ.XY.prototype.invertX = function() { this.m_x.invert(); };
QQ.XY.prototype.invertY = function() { this.m_y.invert(); };
