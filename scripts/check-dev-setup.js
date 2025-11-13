const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');

function ok(msg) { console.log('✅', msg); }
function warn(msg) { console.warn('⚠️', msg); }
function fail(msg) { console.error('❌', msg); }

function checkNodeVersion(minMajor = 16) {
  const ver = process.version.replace(/^v/, '');
  const major = parseInt(ver.split('.')[0], 10);
  if (Number.isNaN(major) || major < minMajor) {
    fail(`Node ${minMajor}+ required (found ${process.version})`);
    return false;
  }
  ok(`Node ${process.version}`);
  return true;
}

function commandExists(cmd) {
  try {
    execSync(cmd, { stdio: ['ignore', 'ignore', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

function check() {
  console.log('Running dev env checks from', root);
  let passed = true;

  // Node
  if (!checkNodeVersion(16)) passed = false;

  // npm / yarn
  if (commandExists('npm --version')) {
    ok('npm available');
  } else {
    warn('npm not found on PATH');
  }
  if (commandExists('yarn --version')) {
    ok('yarn available');
  } else {
    warn('yarn not found on PATH (optional)');
  }

  // node_modules
  const nm = path.join(root, 'node_modules');
  if (fs.existsSync(nm)) {
    ok('node_modules present');
  } else {
    fail('node_modules missing — run `npm install` or `yarn`');
    passed = false;
  }

  // google-services.json (Android)
  const gs = path.join(root, 'android', 'app', 'google-services.json');
  if (fs.existsSync(gs)) {
    ok('android/app/google-services.json present');
  } else {
    warn('android/app/google-services.json not found (needed for raw FCM tokens)');
  }

  // iOS GoogleService-Info.plist (common locations)
  const iosCandidates = [
    path.join(root, 'ios', 'GoogleService-Info.plist'),
    path.join(root, 'ios', 'Runner', 'GoogleService-Info.plist'),
    path.join(root, 'ios', 'App', 'GoogleService-Info.plist'),
  ];
  const iosFound = iosCandidates.find(p => fs.existsSync(p));
  if (iosFound) {
    ok(`iOS GoogleService-Info.plist found: ${path.relative(root, iosFound)}`);
  } else {
    warn('iOS GoogleService-Info.plist not found (needed for raw FCM tokens on iOS)');
  }

  // ANDROID_HOME / ANDROID_SDK_ROOT
  const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  if (androidHome && fs.existsSync(androidHome)) {
    ok(`ANDROID_HOME/ANDROID_SDK_ROOT => ${androidHome}`);
    const adbPath = path.join(androidHome, 'platform-tools', process.platform === 'win32' ? 'adb.exe' : 'adb');
    if (fs.existsSync(adbPath)) {
      ok('adb found in Android SDK platform-tools');
    } else {
      warn(`adb not found under ${adbPath}`);
    }
  } else {
    warn('ANDROID_HOME / ANDROID_SDK_ROOT is not set or does not point to an existing folder. Required for Android builds.');
  }

  // JAVA_HOME + java -version
  if (process.env.JAVA_HOME && fs.existsSync(process.env.JAVA_HOME)) {
    ok(`JAVA_HOME => ${process.env.JAVA_HOME}`);
  } else {
    warn('JAVA_HOME not set or path does not exist (required for Android builds)');
  }
  if (commandExists('java -version')) {
    ok('java available on PATH');
  } else {
    warn('java not found on PATH');
  }

  // gradlew
  const gradlew = path.join(root, 'android', process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
  if (fs.existsSync(gradlew)) {
    ok(`gradle wrapper found: ${path.relative(root, gradlew)}`);
  } else {
    warn('gradlew not found under android/ — run `expo prebuild` or ensure native folder exists');
  }

  // Notifee maven presence hint (not strict)
  // We can't verify remote repo accessibility here, just confirm node_modules references exist
  const nodeNotifee = path.join(root, 'node_modules', '@notifee', 'react-native');
  if (fs.existsSync(nodeNotifee)) {
    ok('notifee native module present in node_modules (ensure native setup and rebuild)');
  } else {
    warn('notifee not found in node_modules (install @notifee/react-native if using notifee)');
  }

  console.log('');
  if (!passed) {
    fail('One or more critical checks failed. Fix the issues above and re-run this script.');
    process.exit(1);
  }

  if (passed) {
    ok('All critical checks passed (non-fatal warnings may remain). You can proceed to build.');
    process.exit(0);
  }
}

check();
