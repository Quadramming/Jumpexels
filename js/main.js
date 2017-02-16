window.addEventListener('load', () => {
	
	const imgs = [
		'img/aliens/parrot.png',
		'img/backgrounds/castle.png',
		'img/backgrounds/menu.png',
		'img/buttons/back.png',
		'img/buttons/exit.png',
		'img/buttons/forward.png',
		'img/buttons/level.png',
		'img/buttons/long.png',
		'img/buttons/next.png',
		'img/buttons/restart.png',
		'img/check.png',
		'img/cross.png',
		'img/dialog.png',
		'img/earth.png',
		'img/logo.png',
		'img/ramp.png',
		'img/spaceShip.png'
	];
	
	const appConfig = {
		width:    600,
		height:   800,
		maximize: false
	};
	
	QQ.engine.start(imgs, appConfig);
});
