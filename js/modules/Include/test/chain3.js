docWrite('Hi. I am chain3.js. Let us do some work:</br>');
for ( var z = 0; z < 10000; z++ )
for ( var x = 0; x < 10000; x++ ) {
	Math.sqrt(z*x);
}
docWrite('DONE. Chain3.js finished</br>');
