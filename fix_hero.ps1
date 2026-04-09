$css = Get-Content -Path "style.css" -Raw -Encoding UTF8

$findHero = '  padding: 170px 24px 80px;
  margin-top: -90px;
  background: linear-gradient(135deg, #0a0000 0%, #3a0000 50%, #0a0000 100%);
  background-size: 400% 400%;
  animation: gradientBG 25s ease infinite;
  min-height: calc(100vh - 116px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;'

$replaceHero = '  padding: 170px 24px 80px;
  margin-top: -90px;
  background: #050000;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(200, 0, 30, 0.5) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(255, 0, 0, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(100, 0, 10, 0.8) 0%, transparent 70%),
    linear-gradient(135deg, #050000 0%, #300000 45%, #6e0005 75%, #050000 100%);
  background-size: 200% 200%;
  animation: heroGradientPulse 15s ease-in-out infinite;
  min-height: calc(100vh - 116px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;'

$findKeyframe = '@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}'

$replaceKeyframe = '@keyframes heroGradientPulse {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}'

$css = $css.Replace($findHero, $replaceHero)
$css = $css.Replace($findKeyframe, $replaceKeyframe)

# Remove old particle CSS if it's there
$startP = $css.IndexOf("/* ===== PARTICLES ===== */")
if ($startP -gt 0) {
    # remove till the end
    $css = $css.Substring(0, $startP)
}

$newParticles = @"

/* ===== ENHANCED CINEMATIC PARTICLES ===== */
.ember {
  position: absolute;
  border-radius: 50%;
  background: #ff5e00;
  box-shadow: 0 0 10px 2px rgba(255, 100, 0, 0.7), 0 0 25px 5px rgba(255, 0, 0, 0.5);
  animation-name: floatEmber;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  opacity: 0;
  pointer-events: none;
  filter: blur(1px);
}

.ember.dust {
  background: #ffccbc;
  box-shadow: 0 0 8px 1px rgba(255, 204, 188, 0.5);
  filter: blur(2.5px);
}

@keyframes floatEmber {
  0% {
    transform: translate(0, 0) scale(0.1);
    opacity: 0;
  }
  30% {
    opacity: 0.8;
  }
  70% {
    opacity: 0.6;
  }
  100% {
    transform: translate(calc(-5vw + 15vw * var(--dir-x)), calc(-20vh - 15vh * var(--dir-y))) scale(1.5);
    opacity: 0;
  }
}
"@

$css = $css + $newParticles
Set-Content "style.css" -Value $css -Encoding UTF8
Write-Host "Done Replacement!"
