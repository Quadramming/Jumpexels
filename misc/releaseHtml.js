const fs          = require('fs');
const releaseFile = '../index.release.html';
const file        = fs.readFileSync('../index.html', 'utf-8').split('\n');
const reJs        = /.<script/ig;
const reEndHead   = /<\/head>/ig;

fs.writeFileSync(releaseFile, '', {
	encoding : 'utf-8',
	flag     : 'w'
});
for ( let str of file ) {
	if ( str.match(reJs) || str.trim() === '' ) {
		continue;
	}
	let toWrite = str + '\n';
	if ( str.match(reEndHead) ) {
		toWrite = "\t\t<script type='application/javascript'"+
			"src='release.js'></script>" + 
			'\n' + toWrite;
	}
	fs.writeFileSync(releaseFile, toWrite, {
		encoding : 'utf-8',
		flag     : 'a'
	});
}