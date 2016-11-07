'use strict';

console.log('Global objects: ' + (Object.keys(window).length) );

function c(str) {
	console.log(str);
};

var QQ = QQ || {};

(function() {
	QQ.includer = new QQ.Includer;
	
	QQ.includer.js('js/thirdParty/Matter/matter.js');
	QQ.includer.js('js/modules/Camera/Camera.js');
	QQ.includer.js('js/modules/Canvas/Canvas.js');
	QQ.includer.js('js/modules/FpsCounter/FpsCounter.js');
	QQ.includer.js('js/modules/ImgManager/ImgManager.js');
	QQ.includer.js('js/modules/Math/Math.js');
	QQ.includer.js('js/modules/Matrix/Matrix.js');
	QQ.includer.js('js/modules/Mouse/Mouse.js');
	QQ.includer.js('js/modules/Subject/Subject.js');
	QQ.includer.js('js/modules/Sprite/Sprite.js');
	QQ.includer.js('js/modules/Time/Time.js');
	QQ.includer.js('js/modules/Touch/Touch.js');
	QQ.includer.js('js/modules/Value/Value.js');
	QQ.includer.js('js/modules/Value/XY.js');
	QQ.includer.js('js/modules/World/World.js');
	QQ.includer.js('js/seizures/Loading/Loading.js');
	
	QQ.includer.js('js/Application.js');

	QQ.includer.onLoad(function() {
			QQ.imgManager  = new QQ.ImgManager; 
			QQ.application = new QQ.Application;
		});
})();

// #5061Tw0w0w0w0