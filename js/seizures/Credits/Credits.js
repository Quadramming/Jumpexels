//================================================================
// Name: 
// Version: 16..
// 
// Interface:
// 
//================================================================

'use strict';

QQ.seizures.add('Credits', class Credits {

	constructor(app) {
		this._myApp  = app;
		this._world  = new QQ.World();
		this._camera = new QQ.Camera(app.getCanvas(), 30, 40, 0, -14);
		this._camera.setClip(0, 0, -14, -41);
		this._world.addBackground('img/backgrounds/menu.png');
		
		let credits = new QQ.Text('CREDITS', 0, -4, 3);
		this._world.addSubject(credits);

		let text = new QQ.Text(this._getText(), 0, -7, 28, QQ.Text.fit.WIDTH);
		text.setAlign('left');
		text.setFont('courier new');
		this._world.addSubject(text);
		
		this._addBackButton(0,   0, QQ.Math.pivot.CENTERBOTTOM);
		this._addBackButton(0,   -60, QQ.Math.pivot.CENTERBOTTOM);
		
		let fps = new QQ.Subject(null, 5, 5);
		fps.setPosition(10, -60, QQ.Math.pivot.CENTERBOTTOM);
		fps.click = () => app._fpsCounter.showDetails(); // DEBUG
		this._world.addSubject(fps);
		
	}
	
	tick() {
		let mouse = this._myApp.getMouseXY();
		this._camera.tickScroll(mouse.x, mouse.y, this._myApp.isM1Pressed());
	}
	
	draw() {
		const rect   = this._camera.getViewRect();
		const toDraw = this._world.getSubjectsInRect(rect);
		this._camera.draw(toDraw);
		
	}
	
	clickUp(x, y) {
		if ( ! this._camera.isScrolling() ) {
			const point   = this._camera.getWorldPoint(x, y);
			const clicked = this._world.getSubjectAtPoint(point.x, point.y);
			if ( clicked ) {
				clicked.click();
			}
		}
	}
	
	_addBackButton(x, y, pivot) {
		let back = new QQ.Subject('img/buttons/back.png', 5, 5);
		back.setPosition(x, y, pivot);
		back.click = () => QQ.seizures.set('MainMenu');
		this._world.addSubject(back);
	}
	
	_getText() {
		return `ART:
Kenney (http://kenney.nl)
License CC0 (Creative Commons Zero)

Physics:
matter.js (http://brm.io/matter-js/)
License The MIT License (MIT)
Copyright (c) 2017

Permission is hereby granted, 
free of charge, to any person 
obtaining a copy of this software 
and associated documentation 
files (the "Software"), to deal
in the Software without restriction, 
including without limitation the rights
to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell
copies of the Software, and to permit 
persons to whom the Software is
furnished to do so, subject to the 
following conditions:

The above copyright notice and this 
permission notice shall be included 
in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", 
WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANT
ABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO 
EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES 
OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER  DEALINGS 
IN THE SOFTWARE.`;
	}
	
});