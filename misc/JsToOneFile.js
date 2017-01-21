const fs          = require('fs');
const releaseFile = '../release.big.js';
const file        = fs.readFileSync('../index.html', 'utf-8');
const regexp      = /<script.*javascript.*src='(.*?)'>/ig;
let   script      = regexp.exec(file);
const files       = []; 

while ( script ) {
	files.push( script[1] );
	script = regexp.exec(file);
}

fs.writeFileSync(releaseFile, "// Compiled with JsToOneFile.js\n'use strict';", {
	encoding : 'utf-8',
	flag     : 'w'
});
for ( let file of files ) {
	let toWrite = '\n// ' + file + '\n' +
			fs.readFileSync('../'+file, 'utf-8');
	fs.writeFileSync(releaseFile, toWrite, {
		encoding : 'utf-8',
		flag     : 'a'
	});
}
