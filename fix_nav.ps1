$css = Get-Content -Path "style.css" -Raw -Encoding UTF8

$start = $css.IndexOf("/* ===== NAVBAR ===== */")
$end = $css.IndexOf(".logo-badge,")

if ($start -ge 0 -and $end -gt $start) {
    $before = $css.Substring(0, $start)
    $after = $css.Substring($end)

    $newNav = @"
/* ===== NAVBAR ===== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.navbar.transparent-start {
  background: transparent;
  border-bottom: none;
  backdrop-filter: none;
}
.navbar.transparent-start:not(.scrolled) .nav-link {
  color: rgba(255, 255, 255, 0.9);
}
.navbar.transparent-start:not(.scrolled) .nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}
.navbar.transparent-start:not(.scrolled) .nav-dropdown > button svg {
  stroke: rgba(255, 255, 255, 0.9);
}
.navbar.transparent-start:not(.scrolled) .nav-logo img {
  filter: brightness(0) invert(1);
}
.navbar.transparent-start:not(.scrolled) .nav-cta {
  background: rgba(255,255,255,0.1);
  color: #fff;
}
.navbar.transparent-start:not(.scrolled) .nav-cta:hover {
  background: rgba(255,255,255,0.2);
}

.navbar.scrolled {
  background: #ffffff;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--border-color);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  transition: height 0.3s ease;
}

.navbar.scrolled .nav-container {
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.nav-logo:hover {
  opacity: 0.9;
}

.nav-logo img {
  height: 90px;
  width: auto;
  display: block;
  object-fit: contain;
  margin-top: -25px;
  margin-bottom: -15px;
  transition: height 0.3s ease, margin 0.3s ease;
}

@media (max-width: 768px) {
  .nav-container {
    height: 80px;
  }
  .navbar.scrolled .nav-container {
    height: 60px;
  }
  .nav-logo img {
    height: 70px;
    margin-top: -5px;
  }
  .navbar.scrolled .nav-logo img {
    height: 55px;
    margin-top: -5px;
  }
}

.navbar.scrolled .nav-logo img {
  height: 70px;
  margin-top: -15px;
  margin-bottom: -5px;
}

"@
    $newCss = $before + $newNav + $after
    Set-Content "style.css" -Value $newCss -Encoding UTF8
    Write-Host "Replaced successfully"
} else {
    Write-Host "Could not find start or end"
}
