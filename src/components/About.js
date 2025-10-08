import React, { useEffect, useRef, useState } from 'react';
import './About.css';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

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

  return (
    <section className={`about ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
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
