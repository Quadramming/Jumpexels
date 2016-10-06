var includer = new QQ.Includer;

includer.js('js/Application.js');
includer.js('js/modules/Canvas/Canvas.js');
includer.js('js/modules/FpsCounter/FpsCounter.js');
includer.js('js/modules/Time/Time.js');
includer.js('js/modules/MainMenu/MainMenu.js');
includer.js('js/modules/Sprite/Sprite.js');
includer.js('js/modules/Camera/Camera.js');
includer.js('js/modules/World/World.js');

includer.onLoad(function() {
		new Application;
	});