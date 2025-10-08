import React, { useEffect, useRef, useState } from 'react';
import './Documentary.css';

function Documentary() {
  const [isVisible, setIsVisible] = useState(false);
  const documentaryRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (documentaryRef.current) {
      observer.observe(documentaryRef.current);
    }

    return () => {
      if (documentaryRef.current) {
        observer.unobserve(documentaryRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let grainOffset = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Dust particles floating in light beams
    class DustParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        // Check if particle is in light beam area
        const centerX = canvas.width / 2;
        const distanceFromCenter = Math.abs(this.x - centerX);
        const beamWidth = (this.y / canvas.height) * (canvas.width * 0.6);

        if (distanceFromCenter < beamWidth) {
          const beamOpacity = 1 - (distanceFromCenter / beamWidth);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 180, ${this.opacity * beamOpacity})`;
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new DustParticle());
      }
    };

    const drawLightRays = () => {
      const centerX = canvas.width / 2;
      const topY = 0;
      const numRays = 8;

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 1.2 - Math.PI * 0.6;
        const endX = centerX + Math.sin(angle) * canvas.width * 1.5;
        const endY = canvas.height;

        const gradient = ctx.createLinearGradient(centerX, topY, endX, endY);
        gradient.addColorStop(0, 'rgba(255, 200, 150, 0.08)');
        gradient.addColorStop(0.5, 'rgba(240, 147, 251, 0.03)');
        gradient.addColorStop(1, 'rgba(245, 87, 108, 0)');

        ctx.beginPath();
        ctx.moveTo(centerX, topY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(endX + 100, endY);
        ctx.lineTo(centerX, topY);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawFilmGrain = () => {
      const grainSize = 1;
      const grainDensity = 0.02;

      for (let i = 0; i < (canvas.width * canvas.height * grainDensity); i++) {
        const x = Math.random() * canvas.width;
        const y = (Math.random() * canvas.height + grainOffset) % canvas.height;
        const opacity = Math.random() * 0.15;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, grainSize, grainSize);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw light rays first
      drawLightRays();

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw film grain
      drawFilmGrain();
      grainOffset += 2;

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const resizeHandler = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const films = [
    {
      title: "Going Home To Leave Again",
      videoId: "3nuzwelEr64",
      director: "Deden Bangkit",
      executiveProducer: "Gregory Randolph, Sabina Dewan",
      description: "The JustJobs Network conducted primary research in Indonesia, that involved interviews with a variety of stakeholders in the Kabupaten of Sumbawa in West Nusa Tenggara."
    },
    {
      title: "The Changing Climate of Livelihoods",
      videoId: "iwmW2HaYOug",
      director: "Deden Bangkit",
      coDirector: "Jit Shankar Bernajee",
      executiveProducer: "Gregory Randolph",
      description: "Erratic rainfall, land salinity and cyclones are affecting the livelihoods of tea planters in India, rice growers in Bangladesh and fishermen in Indonesia. What are the strategies they are adopting to cope and survive? Based on research supported by Union to Union, JustJobs Network finds the answers in the film: The Changing Climate of Livelihoods."
    }
  ];

  return (
    <section className={`documentary ${isVisible ? 'visible' : ''}`} ref={documentaryRef}>
      <canvas ref={canvasRef} className="film-canvas"></canvas>
      <div className="documentary-container">
        <h2 className="section-title">Documentary Films</h2>
        <div className="divider"></div>
        <p className="documentary-subtitle">Stories that matter, voices that need to be heard</p>

        <div className="films-grid">
          {films.map((film, idx) => (
            <div key={idx} className="film-card" style={{ transitionDelay: `${idx * 0.2}s` }}>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${film.videoId}`}
                  title={film.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="film-info">
                <h3 className="film-title">{film.title}</h3>
                <div className="film-credits">
                  <p><strong>Director:</strong> {film.director}</p>
                  {film.coDirector && <p><strong>Co-Director:</strong> {film.coDirector}</p>}
                  <p><strong>Executive Producer:</strong> {film.executiveProducer}</p>
                </div>
                <p className="film-description">{film.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Documentary;
