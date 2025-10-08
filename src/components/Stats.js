import React, { useEffect, useRef, useState } from "react";
import "./Stats.css";

function Stats() {
	const [isVisible, setIsVisible] = useState(false);
	const statsRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (statsRef.current) {
			observer.observe(statsRef.current);
		}

		return () => {
			if (statsRef.current) {
				observer.unobserve(statsRef.current);
			}
		};
	}, []);

	return (
		<section className={`stats ${isVisible ? "visible" : ""}`} ref={statsRef}>
			<div className="stats-container">
				<h2 className="section-title">GitHub Statistics</h2>
				<div className="divider"></div>
				<p className="stats-subtitle">My coding journey in numbers</p>

				<div className="stats-grid">
					<div className="stat-card">
						<img
							src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=dedenbangkit&theme=transparent"
							alt="Profile Details"
							loading="lazy"
						/>
					</div>

					<div className="stat-row">
						<div className="stat-card-small">
							<img
								src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=dedenbangkit&theme=transparent"
								alt="Stats"
								loading="lazy"
							/>
						</div>

						<div className="stat-card-small">
							<img
								src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=dedenbangkit&theme=transparent"
								alt="Repos per Language"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Stats;
