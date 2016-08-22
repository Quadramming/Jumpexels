var includer = new Includer;

includer.js('js/Application.js');
includer.js('js/modules/Canvas/Canvas.js');
includer.js('js/modules/FpsCounter/FpsCounter.js');
includer.js('js/modules/Time/Time.js');

includer.onLoad(function() {
		new Application;
	});