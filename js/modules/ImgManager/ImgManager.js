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

QQ.ImgManager = function() {

	//================================
	// Public methods
	//================================
	
	this.get = function(url) {	
		for ( var i in imgs ) {
			if ( imgs[i].url === url ) {
				return imgs[i].obj;
			}
		}
		
		var img         = {};
		img.url         = url;
		img.isReady     = false;
		img.obj         = new Image;
		img.obj.src     = url;
		img.obj.onload  = function() {
				this.isReady = true;
			}.bind(img);
		imgs.push(img);
		return img.obj;
	};
	
	this.isReady = function(imgObj) {
		for ( var i in imgs ) {
			if ( imgs[i].obj === imgObj ) {
				return imgs[i].isReady;
			}
		}
		return false;
	};
	
	//================================
	// Private vars
	//================================
	
	var imgs = [];
};
