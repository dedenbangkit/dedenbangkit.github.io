import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const socials = [
    { 
      name: "Twitter", 
      url: "https://twitter.com/denbangkit",
      icon: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg"
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/in/deden-bangkit",
      icon: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
    },
    { 
      name: "Facebook", 
      url: "https://fb.com/dedenbangkit",
      icon: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg"
    },
    { 
      name: "Instagram", 
      url: "https://instagram.com/dedenbangkit",
      icon: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg"
    },
    { 
      name: "YouTube", 
      url: "https://youtube.com/@bangunjiwo",
      icon: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg"
    },
  ];

  return (
    <section className={`contact ${isVisible ? 'visible' : ''}`} ref={contactRef}>
      <div className="contact-container">
        <h2 className="section-title">Let's Connect</h2>
        <div className="divider"></div>
        <p className="contact-subtitle">Find me on social media</p>
        
        <div className="social-links">
          {socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="social-icon">
                <img src={social.icon} alt={social.name} />
              </div>
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="contact-footer">
          <p>© {new Date().getFullYear()} Deden Bangkit. Built with React & Docker.</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
