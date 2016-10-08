//================================================================
// Name: QQ.Touch
// Version: 16.04.25
// 
// Class emulate mouse on touch devices. Uses mouse module.
// 
// Interface:
// 
// Touch(mouse);
//   Creates object with help of mouse class.
//================================================================
'use strict';

var QQ = QQ || {};

QQ.Touch = function(mouse) {

	init = function() {
		window.addEventListener('touchstart', function(e) {
			var touchobj = e.touches[0];
			if ( typeof touchobj.clientX === 'number' && typeof touchobj.clientY === 'number' ) {
				x = touchobj.clientX;
				y = touchobj.clientY;
				mouse.emulate(x, y, true);
			}
			e.preventDefault();
		});

		window.addEventListener('touchmove', function(e) {
			var touchobj = e.touches[0];
			if ( typeof touchobj.clientX === 'number' && typeof touchobj.clientY === 'number' ) {
				x = touchobj.clientX;
				y = touchobj.clientY;
				mouse.emulate(x, y, true);
			}
			e.preventDefault();
		});

		window.addEventListener('touchend', function(e) {
			mouse.emulate(x, y, false);
			e.preventDefault();
		});
	};

	//================================
	// Private vars
	//================================
	
	var x = 0;
	var y = 0;
	
	init();
};
