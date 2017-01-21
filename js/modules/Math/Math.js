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
 
QQ.Math.secToMs = function(x) { 
	 return x * 1000;
 };

QQ.Math.isIntersect = function(box1, box2) {
	if ( box1.y1 < box2.y2 || box1.y2 > box2.y1 ) {
		return false;
	}
	if ( box1.x2 < box2.x1 || box1.x1 > box2.x2 ) {
		return false;
	}
	return true;
};

QQ.Math.isInside = function(box1, x, y) {
	if ( box1.y1 > y && y > box1.y2 && box1.x1 < x && x < box1.x2  ) {
		return true;
	}
	return false;
};

QQ.Math.PIx2 = Math.PI*2;

QQ.Math.calcPivotX = function(p, x, w) {
	const pivot = QQ.Math.pivot;
	if ( p === pivot.CENTERTOP ) {
		return x;
	} else if ( p === pivot.CENTERBOTTOM ) {
		return x;
	} else if ( p === pivot.CENTER ) {
		return x;
	} else if ( p === pivot.LEFTTOP ) {
		return x + w/2;
	}
};

QQ.Math.calcPivotY = function(p, y, h, yAxis = 1) {
	const pivot = QQ.Math.pivot;
	if ( p === pivot.CENTERTOP ) {
		return y - (yAxis)*(h/2);
	} else if ( p === pivot.CENTERBOTTOM ) {
		return y + (yAxis)*(h/2);
	} else if ( p === pivot.CENTER ) {
		return y;
	} else if ( p === pivot.LEFTTOP ) {
		return y - (yAxis)*(h/2);
	}
};

QQ.Math.pivot = {
	NONE         : 1,
	CENTER       : 2,
	LEFTTOP      : 3,
	CENTERBOTTOM : 4,
	CENTERTOP    : 5
};