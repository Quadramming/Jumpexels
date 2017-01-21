var fs   = require('fs');
var path = require('path');

processDir('img');
processDir('fonts');
processDir('css');
processDir('sound');
processFile('release.js');
processFile('index.release.html', 'index.html');

function processDir(d) {
	deleteFolderRecursive('../../app/www/'+d);
	copyFolderRecursiveSync('../'+d, '../../app/www');
}

function processFile(s, d = s) {
	if ( fs.existsSync( '../'+s ) ) {
		if ( fs.existsSync( '../../app/www/'+d ) ) {
			fs.unlinkSync('../../app/www/'+d);
		}
		copyFileSync('../'+s, '../../app/www/'+d);
	}
}

function copyFileSync(source, target) {
	let targetFile = target;
	if ( fs.existsSync(target) ) {
		if ( fs.lstatSync(target).isDirectory() ) {
			targetFile = path.join(target, path.basename(source));
		}
	}
	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
	let files        = [];
	let targetFolder = path.join(target, path.basename(source));
	if ( ! fs.existsSync(targetFolder) ) {
		fs.mkdirSync(targetFolder);
	}
	if ( fs.lstatSync(source).isDirectory() ) {
		files = fs.readdirSync(source);
		files.forEach( function(file) {
			let curSource = path.join(source, file);
			if ( fs.lstatSync(curSource).isDirectory() ) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		} );
	}
}

function deleteFolderRecursive(path) {
	if ( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach( function(file, index) {
			let curPath = path + '/' + file;
			if ( fs.lstatSync(curPath).isDirectory() ) {
				deleteFolderRecursive(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
