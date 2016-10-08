'use strict';

function c(str) {
	console.log(str);
};

(function() {
	var includer = new QQ.Includer;
	
	includer.js('js/modules/Camera/Camera.js');
	includer.js('js/modules/Canvas/Canvas.js');
	includer.js('js/modules/FpsCounter/FpsCounter.js');
	includer.js('js/modules/ImgManager/ImgManager.js');
	includer.js('js/modules/MainMenu/MainMenu.js');
	includer.js('js/modules/Math/Math.js');
	includer.js('js/modules/Matrix/Matrix.js');
	includer.js('js/modules/Mouse/Mouse.js');
	includer.js('js/modules/Subject/Subject.js');
	includer.js('js/modules/Sprite/Sprite.js');
	includer.js('js/modules/Time/Time.js');
	includer.js('js/modules/Touch/Touch.js');
	includer.js('js/modules/Value/Value.js');
	includer.js('js/modules/Value/XY.js');
	includer.js('js/modules/World/World.js');
	
	includer.js('js/Application.js');

	includer.onLoad(function() {
			QQ.imgManager   = new QQ.ImgManager; 
			var application = new QQ.Application;
		});
})();

console.log('Global objects: ' + (Object.keys(window).length) );
