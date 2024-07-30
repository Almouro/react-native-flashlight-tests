set -e
set -x

VERSION="$1"
ENABLE_NEW_ARCH=$2
SCENARIO=$3

release_name=${VERSION//./_}
release_name=${release_name//-/_}
release_name=$(echo "$release_name" | tr '[:lower:]' '[:upper:]')

NAME="RN$release_name"
APP_FOLDER="$NAME"_"$ENABLE_NEW_ARCH"

mkdir -p apps
mkdir -p apks

rm -f package.json
rm -f yarn.lock
rm -rf .git
git config --global user.email "you@example.com"
git config --global user.name "Your Name"

cd apps
npx @react-native-community/cli@latest init $APP_FOLDER --version $VERSION --verbose --install-pods false

cp -R ../scenarios/$SCENARIO $APP_FOLDER/scenario
cd $APP_FOLDER
echo "export {default} from './scenario/App';" > App.tsx
echo "export {default} from './scenario/App';" > App.js

YARN_ENABLE_IMMUTABLE_INSTALLS=false yarn
# chmod +x node_modules/react-native/sdks/hermesc/linux64-bin/hermesc

sed -i -e "s/newArchEnabled=true/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties
sed -i -e "s/newArchEnabled=false/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties

rm -f "react-native.config.js"
sed -i -e "s/enableHermes: false/enableHermes: true/" android/app/build.gradle

cd android

./gradlew clean assembleRelease --stacktrace

mv app/build/outputs/apk/release/app-release.apk ../../../apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk

echo "APK_PATH=apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk" >> $GITHUB_ENV
