//================================================================
// Name: QQ.ImgManager
// Version: 16.04.22
// 
// Interface:
//
// get(url);
//   Return Image object from cache or creates new.
//   
// isReady(imgObj);
//   True if imgObj is loaded.
//================================================================

'use strict';


QQ.imgManager = new class ImgManager {

	constructor() {
		this._imgs = [];
	}

	get(url) {
		for ( const img of this._imgs ) {
			if ( img.url === url ) {
				return img.obj;
			}
		}
		let img     = {};
		img.url     = url;
		img.obj     = new Image;
		img.obj.src = url;
		this._imgs.push(img);
		return img.obj;
	}
	
	isAllReady() {
		for ( const img of this._imgs ) {
			if ( img.obj.complete === false ) {
				return false;
			}
		}
		return true;
	}

	isReady(imgObj) {
		for ( const img of this._imgs ) {
			if ( img.obj === imgObj ) {
				return img.obj.complete;
			}
		}
		return false;
	}

}();
