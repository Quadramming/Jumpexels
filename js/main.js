window.addEventListener('load', () => {
	
	function main() {
		QQ.application = new QQ.Application();
		QQ.seizures.init();
		QQ.application.init();
	}
	
	// LOAD IMG
	QQ.imgManager.get('img/aliens/parrot.png');
	QQ.imgManager.get('img/backgrounds/castle.png');
	QQ.imgManager.get('img/backgrounds/menu.png');
	QQ.imgManager.get('img/buttons/back.png');
	QQ.imgManager.get('img/buttons/exit.png');
	QQ.imgManager.get('img/buttons/forward.png');
	QQ.imgManager.get('img/buttons/level.png');
	QQ.imgManager.get('img/buttons/long.png');
	QQ.imgManager.get('img/buttons/next.png');
	QQ.imgManager.get('img/buttons/restart.png');
	QQ.imgManager.get('img/check.png');
	QQ.imgManager.get('img/cross.png');
	QQ.imgManager.get('img/dialog.png');
	QQ.imgManager.get('img/earth.png');
	QQ.imgManager.get('img/logo.png');
	QQ.imgManager.get('img/ramp.png');
	QQ.imgManager.get('img/spaceShip.png');
	
	(function me() {
		QQ.imgManager.isAllReady() ? 
			main(): 
			setTimeout(me, 10);
	})();
	
});
