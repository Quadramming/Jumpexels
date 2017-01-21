nodejs JsToOneFile.js
java -jar ../../cc.jar --js ../release.big.js --js_output_file ../release.js
nodejs releaseHtml.js
nodejs copyFiles.js
cd ../../app
cordova build android
cd ../public_html/misc
cp ../../app/platforms/android/build/outputs/apk/android-debug.apk ../android-debug.apk
