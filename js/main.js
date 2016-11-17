'use strict';

var QQ = QQ || {};

(function() {
	QQ.Includer.js('js/thirdParty/Matter/matter.js');
	QQ.Includer.js('js/modules/Camera/Camera.js');
	QQ.Includer.js('js/modules/Canvas/Canvas.js');
	QQ.Includer.js('js/modules/FpsCounter/FpsCounter.js');
	QQ.Includer.js('js/modules/ImgManager/ImgManager.js');
	QQ.Includer.js('js/modules/Math/Math.js');
	QQ.Includer.js('js/modules/Matrix/Matrix.js');
	QQ.Includer.js('js/modules/Mouse/Mouse.js');
	QQ.Includer.js('js/modules/Subject/Subject.js');
	QQ.Includer.js('js/modules/Sprite/Sprite.js');
	QQ.Includer.js('js/modules/Time/Time.js');
	QQ.Includer.js('js/modules/Touch/Touch.js');
	QQ.Includer.js('js/modules/Value/Value.js');
	QQ.Includer.js('js/modules/Value/XY.js');
	QQ.Includer.js('js/modules/World/World.js');
	QQ.Includer.js('js/seizures/Loading/Loading.js');

	QQ.Includer.js('js/Application.js');

	QQ.Includer.onLoad(function() {
			QQ.Application.get();
		});
})();
