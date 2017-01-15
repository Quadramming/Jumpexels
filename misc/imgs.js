let fs     = require('fs');
let output = 'imgs.txt';

function getFiles (dir, files_ = []) {
	var files = fs.readdirSync(dir);
	for ( var i in files ) {
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
}

if ( fs.existsSync(output) ) {
	fs.unlinkSync(output);
}

for ( let file of getFiles('../img') ) {
	file = file.substr(3);
	fs.writeFileSync(
		output,
		"QQ.imgManager.get('"+file+"');\n",
		{
			encoding : 'utf-8',
			flag     : 'a'
		}
	);
}
