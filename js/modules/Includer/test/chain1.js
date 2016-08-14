docWrite('Hi. I am chain1.js</br>');
include.js('chain2.js', function() {docWrite('Chain2.js is loaded (callback)</br>');});