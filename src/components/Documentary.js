import React, { useEffect, useRef, useState } from 'react';
import './Documentary.css';

function Documentary() {
  const [isVisible, setIsVisible] = useState(false);
  const documentaryRef = useRef(null);

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
