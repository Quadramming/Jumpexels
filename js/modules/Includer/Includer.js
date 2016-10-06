//================================================================
// Name: QQ.Includer
// Version: 16.04.19
// 
// Interface:
//
// js(file, callback, forced);
// js(file, forced);
//   To include JS files. Forced flag will reload file if he already loaded.
//   Callback will happend when ALL JS files will be loaded (Not only this).
// 
// allowWarnings(bool);
//   Show or don't warnings in console.
// 
// onLoad(callback);
//   Callback will be called when all JS files will be loaded. 
//   
//================================================================

var QQ = QQ || {};

QQ.Includer = function() {
		
	//================================
	// Public methods
	//================================
	
	this.js = function(file, cb, forced) {
		if ( cb === true ) {
			cb     = undefined;
			forced = true;
		}
		
		var script   = document.createElement('script');
		script.src   = file;
		script.type  = 'text/javascript';
		script.defer = true;

		var onReady = function() {
			var i = loading.indexOf(script.src);
			if ( i !== -1 ) {
				loading.splice(i, 1);
			}
			if ( cb ) {
				this.onLoad(cb);
			}
		}.bind(this);
		
		script.onreadystatechange = onReady;
		script.onload             = onReady;
		
		var scripts = getScripts();
		for ( var i in scripts ) {
			if ( scripts[i].src === script.src ) {
				if ( loading.indexOf(script.src) !== -1 ) {
					showWarning(
							'Warning: File already loading ('+script.src+')'
						);
					return;
				}
				if ( ! forced ) {
					showWarning(
							'Warning: File already loaded ('+script.src+'). ' +
							'Use "forced" flag to reload file.'
						);
					return;
				} else {
					document.getElementsByTagName('head').item(0).removeChild(scripts[i]);
				}
			}
		}
		document.getElementsByTagName('head').item(0).appendChild(script);
		loading.push(script.src);
	};
	
	this.onLoad = function(cb) {
		var waitLoading = function() {
			if ( isReady() ) {
				cb();
			} else {
				window.setTimeout(waitLoading, 100);
			}
		}.bind(this);
		waitLoading();
	};
	
	this.allowWarnings = function(isShow) {
		showWarnings = isShow;
	};
	
	//================================
	// Private methods
	//================================
	
	function getScripts() {
		var result  = [];
		var scripts = document.getElementsByTagName('script');
		for ( var i = 0; i < scripts.length; ++i ) {
			if ( scripts[i].src !== '' ) {
				result.push(scripts[i]);
			}
		}
		return result;
	};
	
	function isReady() {
		return loading.length === 0;
	};
	
	function showWarning(text) {
		if ( showWarnings ) {
			console.log(text);
		}
	};
		
	//================================
	// Private vars
	//================================

	var loading      = [];
	var showWarnings = true;
};
