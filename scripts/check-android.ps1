Write-Output "== Android SDK / ADB environment check (PowerShell) =="

$androidHome = $env:ANDROID_HOME
if ([string]::IsNullOrEmpty($androidHome)) {
  Write-Output "ANDROID_HOME is NOT set."
  $default = Join-Path $env:USERPROFILE "AppData\Local\Android\Sdk"
  if (Test-Path $default) {
    Write-Output "Found SDK at default location: $default"
    Write-Output "To set ANDROID_HOME (user scope) run:"
    Write-Output "  [Environment]::SetEnvironmentVariable('ANDROID_HOME', '$default', 'User')"
  } else {
    Write-Output "Default SDK location not found: $default"
    Write-Output "Install the Android SDK (Android Studio) or set ANDROID_HOME to your SDK path."
  }
} else {
  Write-Output "ANDROID_HOME => $androidHome"
}

Write-Output ""

$adbPath = (Get-Command adb -ErrorAction SilentlyContinue)?.Source
if ($adbPath) {
  Write-Output "adb found at: $adbPath"
} else {
  Write-Output "adb not found on PATH."
  if ($env:ANDROID_HOME) {
    $pt = Join-Path $env:ANDROID_HOME "platform-tools"
    Write-Output "You can add it to PATH (user scope) with:"
    Write-Output "  [Environment]::SetEnvironmentVariable('PATH', \$env:PATH + ';$pt', 'User')"
    Write-Output "Note: After changing PATH you must restart your terminal/IDE for changes to take effect."
  } else {
    Write-Output "Set ANDROID_HOME first or install platform-tools and add them to PATH."
  }
}

Write-Output ""
Write-Output "Quick troubleshooting:"
Write-Output "- Ensure Google Play Services present on test device (for push notifications)."
Write-Output "- Rebuild the app after adding google-services.json (expo prebuild / eas build)."
Write-Output "- If you set env vars via UI, restart the terminal/IDE to pick them up."
