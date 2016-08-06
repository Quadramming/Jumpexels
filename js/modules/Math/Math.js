//================================================================
// Name: Math
// Version: 25.04.16
// 
// Interface:
//
// Math.rand(min, max, round);
//   Get random number [min;max] if round === true.
//   Get random float [min;max) if round !== true.
//   
// Math.reduceToSize(w, h, size);
//   Get scale to fit w:h to size
//   
// Math.scaleToSize(w, h, size);
//   Scale w:h to size
//   
// Math.devidePeriod(val, period);
//   Get val after devision by period
// 
// Math.devideAngle(angle);
//   Get angle after division by Math.PI*2
//   
// Math.sinBetweenVectors(ax, ay, bx, by);
//   Get sin between 2 vectors.
//   
// Math.calcProgress(start, duration);
//   Get progress between [0;1] from start to now using duration.
//   
// Math.getSign(x);
//   Return -1 or 1 dependent of x sign.
//================================================================

Math.rand = function(min, max, round) {
	if ( round ) {
		return Math.round(Math.random() * (max - min)) + min;
	} else {
		return Math.random() * (max - min) + min;
	}
};

Math.reduceToSize = function(w, h, size) {
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

Math.scaleToSize = function(w, h, size) {
	var scaleW = size / w;
	var scaleH = size / h;
	return scaleW < scaleH ? scaleW : scaleH;
};

Math.devidePeriod = function(val, period) {
	if ( val > period ) {
		val %= period;
	}
	return val;
};

Math.devideAngle = function(angle) {
	if ( angle > Math.PI ) {
		angle -= Math.PI*2;
	}
	if ( angle < -Math.PI ) {
		angle += Math.PI*2;
	}
	return angle;
};

Math.sinBetweenVectors = function(ax, ay, bx, by) {
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

Math.calcProgress = function(start, duration) {
	var passed   = Date.now() - start;
	var progress = passed / duration;
	return progress < 1 ? progress : 1;
};

 Math.getSign = function(x) { 
	 return x >= 0 ? 1 : -1;
 };

