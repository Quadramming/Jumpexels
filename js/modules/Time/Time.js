//================================================================
// Name: Time
// Version: 21.04.16
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

function Time() {
		
	//================================
	// Public methods
	//================================
	
	this.now = function() {
		return nowTime;
	};
	
	this.update = function() {
		var prevTime = nowTime;
		nowTime      = Date.now();
		var diff     = nowTime - prevTime;
		return diff / 1000;
	};
	
	//================================
	// Private vars
	//================================
	
	var nowTime = Date.now();
};
