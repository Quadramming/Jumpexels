docWrite('Hi. I am chain2.js</br>');
include.js('chain3.js', function() {docWrite('Chain3.js is loaded (callback)</br>');});