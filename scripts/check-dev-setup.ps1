Write-Output "Running dev environment checks..."
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  Write-Error "Node not found. Install Node.js and ensure 'node' is on PATH."
  exit 1
}
& node (Join-Path $scriptDir "check-dev-setup.js")
exit $LASTEXITCODE
