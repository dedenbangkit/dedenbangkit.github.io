import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
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

    const handleMouseMove = (e) => {
      const rect = skillsRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }

        // Normal movement
        this.y += this.speedY;
        this.x += this.speedX;

        // Boundary check
        if (this.y > canvas.height + 10) {
          this.reset();
        }
        if (this.x < -10 || this.x > canvas.width + 10) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity * 0.2})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

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
    skillsRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
      if (skillsRef.current) {
        skillsRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Shell", badge: "https://img.shields.io/badge/shell_script-%23474747.svg?style=flat-square&logo=gnu-bash&logoColor=white" },
        { name: "Python", badge: "https://img.shields.io/badge/python-3670A0?style=flat-square&logo=python&logoColor=ffdd54" },
        { name: "Java", badge: "https://img.shields.io/badge/java-%23ED8B00.svg?style=flat-square&logo=openjdk&logoColor=white" },
        { name: "PHP", badge: "https://img.shields.io/badge/php-%23777BB4.svg?style=flat-square&logo=php&logoColor=white" },
        { name: "Clojure", badge: "https://img.shields.io/badge/Clojure-%23Clojure.svg?style=flat-square&logo=Clojure&logoColor=white" },
        { name: "Go", badge: "https://img.shields.io/badge/go-%2300ADD8.svg?style=flat-square&logo=go&logoColor=white" },
        { name: "Scala", badge: "https://img.shields.io/badge/scala-%23DC322F.svg?style=flat-square&logo=scala&logoColor=white" },
        { name: "Rust", badge: "https://img.shields.io/badge/rust-%23000000.svg?style=flat-square&logo=rust&logoColor=white" },
      ]
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "Spring", badge: "https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" },
        { name: "Django", badge: "https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" },
        { name: "FastAPI", badge: "https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" },
        { name: "Flask", badge: "https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" },
        { name: "React", badge: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" },
        { name: "Node.js", badge: "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" },
        { name: "Docker", badge: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" },
        { name: "Kubernetes", badge: "https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" },
      ]
    },
    {
      title: "Databases & Message Brokers",
      skills: [
        { name: "PostgreSQL", badge: "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" },
        { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" },
        { name: "Redis", badge: "https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" },
        { name: "Cassandra", badge: "https://img.shields.io/badge/cassandra-%231287B1.svg?style=for-the-badge&logo=apache-cassandra&logoColor=white" },
        { name: "Kafka", badge: "https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka" },
        { name: "RabbitMQ", badge: "https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" },
        { name: "Elasticsearch", badge: "https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch" },
        { name: "Firebase", badge: "https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" },
      ]
    },
    {
      title: "AI & Productivity Tools",
      skills: [
        { name: "Claude", badge: "https://img.shields.io/badge/Claude-6C47FF?style=for-the-badge&logo=anthropic&logoColor=white" },
        { name: "ChatGPT", badge: "https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" },
        { name: "GitHub Copilot", badge: "https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github&logoColor=white" },
        { name: "Notion", badge: "https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" },
        { name: "Jira", badge: "https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" },
        { name: "Asana", badge: "https://img.shields.io/badge/Asana-273347?style=for-the-badge&logo=asana&logoColor=white" },
        { name: "Slack", badge: "https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" },
        { name: "Trello", badge: "https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white" },
      ]
    },
    {
      title: "Data Visualization & GIS",
      skills: [
        { name: "QGIS", badge: "https://img.shields.io/badge/QGIS-589632?style=for-the-badge&logo=qgis&logoColor=white" },
        { name: "Leaflet", badge: "https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" },
        { name: "Apache ECharts", badge: "https://img.shields.io/badge/Apache_ECharts-AA344D?style=for-the-badge&logo=apache-echarts&logoColor=white" },
        { name: "Mapbox", badge: "https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white" },
        { name: "D3.js", badge: "https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" },
        { name: "Plotly", badge: "https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white" },
        { name: "Tableau", badge: "https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=tableau&logoColor=white" },
        { name: "Power BI", badge: "https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" },
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", badge: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" },
        { name: "Google Cloud", badge: "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" },
        { name: "Azure", badge: "https://img.shields.io/badge/Microsoft_Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white" },
        { name: "Terraform", badge: "https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" },
        { name: "Jenkins", badge: "https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" },
        { name: "GitHub Actions", badge: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" },
        { name: "GitLab CI", badge: "https://img.shields.io/badge/GitLab_CI-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white" },
        { name: "Ansible", badge: "https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white" },
      ]
    }
  ];

  return (
    <section className={`skills ${isVisible ? 'visible' : ''}`} ref={skillsRef}>
      <canvas ref={canvasRef} className="dust-canvas"></canvas>
      <div className="skills-container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="divider"></div>
        <p className="skills-subtitle">Technologies I work with</p>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-badges">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="skill-badge-wrapper" style={{ transitionDelay: `${(idx * 0.1) + (skillIdx * 0.05)}s` }}>
                    <img src={skill.badge} alt={skill.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
