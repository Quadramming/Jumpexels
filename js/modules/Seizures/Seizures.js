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
		this._loading    = null;
		this._seizure    = null;
		this._seizures   = [];
	}
	
	init() {
		this._loading    = new QQ.Seizures.SeizureLoading(QQ.application);
		this._seizure    = this._loading;
	}
	
	add(name, newSeizure) {
		this._seizures[name] = newSeizure;
	}
	
	set(newSeizure, input) {
		if ( this._loading !== null ) {
			this._seizure = this._loading;
		}
		setTimeout(
			() => {
				this._seizure = new this._seizures[newSeizure](QQ.application, input);
			},
			200
		);
		
	}
	
	tick(delta) {
		if ( this._seizure.tick ) {
			this._seizure.tick(delta);
		}
	}
	
	draw() {
		if ( this._seizure.draw ) {
			this._seizure.draw();
		}
	}
	
	click(x, y) {
		if ( this._seizure.click ) {
			this._seizure.click(x, y);
		}
	}
	
	clickUp(x, y) {
		if ( this._seizure.clickUp ) {
			this._seizure.clickUp(x, y);
		}
	}
	
};

QQ.seizures = new QQ.Seizures();