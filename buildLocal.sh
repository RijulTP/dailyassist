eas build --platform android --local
bundletool build-apks --bundle=build-1692028240051.aab --output=karma.apks  --mode=universal --ks=a.keystore  --ks-pass=pass:deepu10 --ks-key-alias=hexmos --key-pass=pass:deepu10
unzip -p karma.apks universal.apk > release.apk


#TODO: Remove old apks 
