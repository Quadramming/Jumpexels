//================================================================
// Name: QQ.Math
// Version: 16.04.25
// 
// Interface:
//
// QQ.Math.rand(min, max, round);
//   Get random number [min;max] if round === true.
//   Get random float [min;max) if round !== true.
//   
// QQ.Math.reduceToSize(w, h, size);
//   Get scale to fit w:h to size
//   
// QQ.Math.scaleToSize(w, h, size);
//   Scale w:h to size
//   
// QQ.Math.devidePeriod(val, period);
//   Get val after devision by period
// 
// QQ.Math.devideAngle(angle);
//   Get angle after division by Math.PI*2
//   
// QQ.Math.sinBetweenVectors(ax, ay, bx, by);
//   Get sin between 2 vectors.
//   
// QQ.Math.calcProgress(start, duration);
//   Get progress between [0;1] from start to now using duration.
//   
// QQ.Math.getSign(x);
//   Return -1 or 1 dependent of x sign.
//   
// QQ.Math.isIntersect(box1, box2);
//   Check is boxes are intersect. Needs property: x1 x2 y1 y2
//================================================================
'use strict';

var QQ = QQ || {};
QQ.Math = {};

QQ.Math.rand = function(min, max, round) {
	if ( round ) {
		return Math.round(Math.random() * (max - min)) + min;
	} else {
		return Math.random() * (max - min) + min;
	}
};

QQ.Math.reduceToSize = function(w, h, size) {
	var scale = 1;
	if ( w > size ) {
		scale = size / w;
	}
	if ( h > size ) {
		var tmp = size / h;
		if ( tmp < scale ) { 
			scale = tmp;
		}
	}
	return scale;
};

QQ.Math.scaleToSize = function(w, h, size) {
	var scaleW = size / w;
	var scaleH = size / h;
	return scaleW < scaleH ? scaleW : scaleH;
};

QQ.Math.devidePeriod = function(val, period) {
	if ( val > period ) {
		val %= period;
	}
	return val;
};

QQ.Math.devideAngle = function(angle) {
	if ( angle > Math.PI ) {
		angle -= Math.PI*2;
	}
	if ( angle < -Math.PI ) {
		angle += Math.PI*2;
	}
	return angle;
};

QQ.Math.sinBetweenVectors = function(ax, ay, bx, by) {
	var mul  = ax*bx + ay*by;
	var lenA = Math.sqrt(ax*ax + ay*ay);
	var lenB = Math.sqrt(bx*bx + by*by);
	var cos  = mul / (lenA*lenB);
	var arg  = 1 - cos*cos;
	if ( arg < 0 ) {
		arg = 0;
	} 
	return Math.sqrt(arg);
};

QQ.Math.calcProgress = function(start, duration) {
	var passed   = Date.now() - start;
	var progress = passed / duration;
	return progress < 1 ? progress : 1;
};

 QQ.Math.getSign = function(x) { 
	 return x >= 0 ? 1 : -1;
 };

QQ.Math.isIntersect = function(box1, box2) {
	if (box1.y1 < box2.y2 || box1.y2 > box2.y1) {
		return false;
	}
	if (box1.x2 < box2.x1 || box1.x1 > box2.x2) {
		return false;
	}
	return true;
};