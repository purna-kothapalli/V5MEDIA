import io

with io.open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

broken_part = """  .navbar.transparent-start:not(.scrolled) .nav-logo img {
    filter: brightness(0) invert(1);
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
  
  .logo-badge,"""

fixed_part = """  .navbar.transparent-start:not(.scrolled) .nav-logo img {
    filter: brightness(0) invert(1);
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
  
  .logo-badge,"""

if broken_part in css:
    css = css.replace(broken_part, fixed_part)
    with io.open("style.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("Fixed!")
else:
    print("Broken part not found. Looking closely...")

