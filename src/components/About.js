import React, { useEffect, useRef, useState } from 'react';
import './About.css';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(97, 218, 251, 0.8)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(97, 218, 251, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className={`about ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
      <canvas ref={canvasRef} className="particles-canvas"></canvas>
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">About Me</h2>
          <div className="divider"></div>
          <p className="about-text">
            Greetings, My name is <strong>Deden Bangkit</strong>
          </p>
          <p className="about-text">
            I am a driven individual with a strong passion for politics and a desire to make a meaningful impact in society. With a background in development and a range of technical skills, I possess the ability to organize information, solve complex problems, and automate processes efficiently.
          </p>
          <p className="about-text">
            Having extensively studied various political ideologies, including those within the right-wing spectrum, I have developed a well-rounded understanding of different perspectives. My personal beliefs and religious values serve as the foundation for my political views, which guide my commitment to advocating for principles I hold dear.
          </p>
          <p className="about-text">
            By combining my technical expertise with my political aspirations, I strive to contribute to the development of effective and productive governance systems that benefit all members of society. I am dedicated to embracing innovative tools to optimize work processes, enhance collaboration among civil society, and ultimately achieve positive change.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
