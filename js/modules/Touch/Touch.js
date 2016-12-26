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

QQ.Touch = class Touch {

	constructor(mouse) {
		let x = 0;
		let y = 0;
		
		window.addEventListener('touchstart', (e) => {
			let touchobj = e.touches[0];
			if ( this._isNumbers(touchobj.clientX, touchobj.clientY) ) {
				x = touchobj.clientX;
				y = touchobj.clientY;
				mouse.emulate(x, y, true);
			}
			e.preventDefault();
		}, {passive: false});

		window.addEventListener('touchmove', (e) => {
			let touchobj = e.touches[0];
			if ( this._isNumbers(touchobj.clientX, touchobj.clientY) ) {
				x = touchobj.clientX;
				y = touchobj.clientY;
				mouse.emulate(x, y, true);
			}
			e.preventDefault();
		}, {passive: false});

		window.addEventListener('touchend', (e) => {
			mouse.emulate(x, y, false);
			e.preventDefault();
			return true;
		}, {passive: false});
	}
	
	_isNumbers(...args) {
		for ( const arg of args ) {
			if ( typeof arg !== 'number' ) {
				return false;
			}
		}
		return true;
	}

};
