//================================================================
// Name: Mouse
// Version: 23.04.16
// 
// Interface:
//
// getX();
//   Get X position
// 
// getY();
//   Get Y position
// 
// getM1();
//   Is mouse1 down
// 
// setM1DownCB(f);
//   Set callback for mouse1 down
//   
// setM1UpCB(f);
//   Set callback for mouse1 up
//   
// emulate(x, y, m);
//   Emulate mouse event.
//   
//================================================================

function Mouse() {
	
	function init() {
		window.addEventListener('mousemove', function(e) {
				if ( typeof e.clientX === "number" && typeof e.clientY === "number" && typeof e.buttons === "number" ) {
					process(e.clientX, e.clientY, e.buttons === 1);
				}
			});
	
		window.addEventListener('mousedown', function(e) {
				if ( typeof e.clientX === "number" && typeof e.clientY === "number" ) {
					process(e.clientX, e.clientY, true);
				}
			});

		window.addEventListener('mouseup', function(e) {
				if ( typeof e.clientX === "number" && typeof e.clientY === "number" ) {
					process(e.clientX, e.clientY, false);
				}
			});
	};
	
	//================================
	// Public methods
	//================================

	this.getX        = function()        { return x;         };
	this.getY        = function()        { return y;         };
	this.getM1       = function()        { return m1;        };
	this.setM1DownCB = function(f)       { m1DownCB = f;     };
	this.setM1UpCB   = function(f)       { m1UpCB   = f;     };
	this.emulate     = function(x, y, m) { process(x, y, m); };

	//================================
	// Private methods
	//================================
	
	function process(newX, newY, newM1) {
		x = newX;
		y = newY;	
		if ( newM1 === true && m1 === false ) {
			m1 = true;
			if ( m1DownCB ) { m1DownCB(); }
		}
		if ( newM1 === false && m1 === true ) {
			m1 = false;
			if ( m1UpCB ) { m1UpCB(); }
		}
	};

	//================================
	// Private vars
	//================================

	var x        = 0;
	var y        = 0;
	var m1       = false;
	var m1DownCB = null;
	var m1UpCB   = null;
	
	init();
};

