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

/* global QQ */
'use strict';

{
	let ImgManager = class {

		constructor(t) {
			this._imgs = [];
		}

		get(url) {	
			for ( let img in this._imgs ) {
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
		};

		isReady(imgObj) {
			for ( let img in this._imgs ) {
				if ( img.obj === imgObj ) {
					return img.obj.complete;
				}
			}
			return false;
		};

	};

	QQ.ImgManager = new ImgManager();
}