var fs = require('fs');

function getFiles (dir, files_ = []) {
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

for ( const file of getFiles('../img') ) {
	fs.writeFileSync(
		'imgs.txt',
		"QQ.imgManager.get('"+file+"');\n",
		{
			encoding : 'utf-8',
			flag     : 'a'
		}
	);
}
