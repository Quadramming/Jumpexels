//================================================================
// Name: QQ.FpsCounter
// Version: 16.04.21
// 
// Interface:
//
// tick(delta);
//   Tick every FPS.
// 
// show(context);
//   Draw FPS at context and title.
//   
// showDetails();
//   Show/hide FPS at given context.
//================================================================

var QQ = QQ || {};

QQ.FpsCounter = function() {
	
	//================================
	// Public methods
	//================================

	this.showDetails = function() {
		details = !details;
	};
	
	this.tick = function(delta) {
		slots[iSlot] = Math.floor(1/delta);
		iSlot = (iSlot+1) % maxSlots;
		
		++accumFps;
		accumDelta += delta;
		if ( accumDelta > 1 ) {
			fpsToShow  = accumFps;
			accumFps   = 0;
			accumDelta = 0;
		}	
	};
	
	this.show = function(ctx) {
		if ( details ) {
			ctx.setTransform(1, 0, 0, 1, 0, 0, 0);
			ctx.font = font;
			for ( var i in slots ) {
				ctx.fillStyle = 'green';
				if ( slots[i] > 99 ) {
					ctx.fillStyle = 'white';
				}
				if ( slots[i] < 55 ) {
					ctx.fillStyle = 'yellow';
				}
				if ( slots[i] < 50 ) {
					ctx.fillStyle = 'red';
				}
				ctx.fillText( slots[i] + ' FPS', 10, 20 + 15*i);
			}
		}
		document.title = fpsToShow + ' FPS';
	};
	
	//================================
	// Private vars
	//================================
	
	var accumDelta  = 0;
	var accumFps    = 0;
	var fpsToShow   = 0;
	var iSlot       = 0;
	var maxSlots    = 30;
	var details     = false;
	var slots       = [];
	var font        = '10px Georgia';

};
