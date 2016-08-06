//================================================================
// Name: Touch
// Version: 23.04.16
// 
// Class emulate moush on touch devices. Use mouse module.
// 
// Interface:
// 
// Touch(mouse);
//   Creates object with help of mouse class.
//================================================================

function Touch(mouse) {

	init = function() {
		window.addEventListener('touchstart', function(e) {
			var touchobj = e.touches[0];
			if ( typeof touchobj.clientX === "number" && typeof touchobj.clientY === "number" ) {
				x = touchobj.clientX;
				y = touchobj.clientY;
				mouse.emulate(x, y, true);
			}
			e.preventDefault();
		});

		window.addEventListener('touchmove', function(e) {
			var touchobj = e.touches[0];
			if ( typeof touchobj.clientX === "number" && typeof touchobj.clientY === "number" ) {
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
