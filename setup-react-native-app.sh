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
cd apps
npx react-native@0.73.0 init $APP_FOLDER --version $VERSION

cp -R ../scenarios/$SCENARIO $APP_FOLDER/scenario
cd $APP_FOLDER
echo "export {default} from './scenario/App';" > App.tsx
echo "export {default} from './scenario/App';" > App.js
yarn

sed -i -e "s/newArchEnabled=false/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties

rm -f "react-native.config.js"
sed -i -e "s/enableHermes: false/enableHermes: true/" android/app/build.gradle

cd android

./gradlew clean assembleRelease

mv app/build/outputs/apk/release/app-release.apk ../../../apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk

echo "APK_PATH=apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk" >> $GITHUB_ENV
