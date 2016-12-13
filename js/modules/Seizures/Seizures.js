//================================================================
// Name: QQ.Seizures
// Version: 20.08.16
// 
// Interface:
// 
//================================================================

'use strict';

QQ.Seizures = class Seizures {
	
	constructor() {
		this._loading     = null;
		this._seizure     = null;
		this._reset       = null;
		this._seizures    = [];
		this._popup       = null;
	}
	
	init() {
		this._loading    = new QQ.Seizures.SeizureLoading(QQ.application);
		this._seizure    = this._loading;
	}
	
	add(name, newSeizure) {
		this._seizures[name] = newSeizure;
	}
	
	popUp(sz, input) {
		this._popup = new this._seizures[sz](QQ.application, input);
	}
	
	closePopUp() {
		this._popup = null;
	}
	
	reset() {
		if ( this._reset ) {
			this._reset();
		}
	}
	
	set(sz, input) {
		if ( this._loading !== null ) {
			this._seizure = this._loading;
		}
		setTimeout(
			() => {
				this._reset   = () => this.set(sz, input);
				this._seizure = new this._seizures[sz](QQ.application, input);
			},
			200
		);
	}
	
	tick(delta) {
		this._doForActive( (sz) => sz.tick(delta) );
	}
	
	draw() {
		this._seizure.draw();
		if ( this._popup ) {
			this._popup.draw();
		}
	}
	
	click(x, y) {
		this._doForActive( (sz) => {
			if ( sz.click ) {
				sz.click(x, y);
			}
		});
	}
	
	clickUp(x, y) {
		this._doForActive( (sz) => {
			if ( sz.clickUp ) {
				sz.clickUp(x, y);
			}
		});
	}
	
	_doForActive(fn) {
		if ( this._popup ) {
			fn(this._popup);
		} else {
			fn(this._seizure);
		}
	}
	
};

QQ.seizures = new QQ.Seizures();