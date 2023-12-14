set -e
set -x

VERSION="$1"
ENABLE_NEW_ARCH=$2
SCENARIO=$3

release_name=${VERSION//./_}
release_name=${release_name//-/_}
release_name=$(echo "$release_name" | tr '[:lower:]' '[:upper:]')
RN_CLI_VERSION=$(echo -e "0.73\n$VERSION" | sort -V | head -n1)
if [ "$RN_CLI_VERSION" != "0.73" ]; then
    RN_CLI_VERSION="0.72"
fi

NAME="RN$release_name"
APP_FOLDER="$NAME"_"$ENABLE_NEW_ARCH"

mkdir -p apps
mkdir -p apks
cd apps
npx react-native@$RN_CLI_VERSION init $APP_FOLDER --version $VERSION

cp -R ../scenarios/$SCENARIO $APP_FOLDER/scenario
cd $APP_FOLDER
echo "export {default} from './scenario/App';" > App.tsx
echo "export {default} from './scenario/App';" > App.js
yarn

sed -i -e "s/newArchEnabled=false/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties

sed -i -e "s/enableHermes: false/enableHermes: true/" android/app/build.gradle


cd android
./gradlew assembleRelease
mv app/build/outputs/apk/release/app-release.apk ../../../apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk

echo "APK_PATH=apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk" >> $GITHUB_ENV
