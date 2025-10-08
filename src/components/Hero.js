import React, { useEffect, useState } from 'react';
import './Hero.css';

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <h1 className="hero-title">
          <span className="gradient-text">Deden Bangkit</span>
        </h1>
        <p className="hero-subtitle">Developer | Political Enthusiast | Problem Solver</p>
        <div className="hero-badges">
          <img src="https://img.shields.io/badge/Emacs-%237F5AB6.svg?&style=flat&logo=gnu-emacs&logoColor=white" alt="Emacs" />
          <img src="https://img.shields.io/badge/orgmode-%2377AA99.svg?style=flat&logo=org&logoColor=white" alt="Org-Mode" />
          <img src="https://img.shields.io/badge/NeoVim-%2357A143.svg?&style=flat&logo=neovim&logoColor=white" alt="NeoVim" />
          <img src="https://img.shields.io/badge/IntelliJIDEA-414144.svg?style=flat&logo=intellij-idea&logoColor=white" alt="IntelliJ" />
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
}

export default Hero;
