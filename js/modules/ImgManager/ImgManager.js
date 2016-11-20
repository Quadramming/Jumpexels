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

var QQ = QQ || {};

QQ.ImgManager = function () {
	var imgs = [];
	
	function get(url) {	
		for ( var i in imgs ) {
			if ( imgs[i].url === url ) {
				return imgs[i].obj;
			}
		}
		var img     = {};
		img.url     = url;
		img.obj     = new Image;
		img.obj.src = url;
		imgs.push(img);
		return img.obj;
	};
	
	function isReady(imgObj) {
		for ( var i in imgs ) {
			if ( imgs[i].obj === imgObj ) {
				return imgs[i].obj.complete;
			}
		}
		return false;
	};
		
    return {
        isReady: isReady,
		get:     get
    };
}();