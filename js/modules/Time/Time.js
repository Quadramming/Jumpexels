//================================================================
// Name: QQ.Time
// Version: 16.04.21
// 
// Interface:
//
// now();
//   Get last saved timestamp. 
//   
// update(callback);
//   Update current time stamp. 
//   And get delta between now and last saved time stamp.
//   Return result is seconds.
//================================================================

/* global QQ */
'use strict';

QQ.Time = class Time {
	
	constructor() {
		this._nowTime = Date.now();
	}

	now() {
		return this._nowTime;
	}
	
	update() {
		let prevTime  = this._nowTime;
		this._nowTime = Date.now();
		let diff      = this._nowTime - prevTime;
		return diff / 1000;
	}

};
