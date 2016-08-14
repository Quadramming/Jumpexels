var includer = new Includer;

includer.onLoad(function() {
	
		var canvas = new Canvas('appCanvas', 600, 800);
		canvas.drawBorder();

		window.addEventListener('resize', function() { 
				canvas.resize();
				canvas.drawBorder();
			});
			
	});