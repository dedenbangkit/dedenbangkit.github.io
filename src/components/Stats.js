import React, { useEffect, useRef, useState } from "react";
import "./Stats.css";

function Stats() {
	const [isVisible, setIsVisible] = useState(false);
	const statsRef = useRef(null);
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

		if (statsRef.current) {
			observer.observe(statsRef.current);
		}

		return () => {
			if (statsRef.current) {
				observer.unobserve(statsRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		let animationFrameId;
		let offset = 0;

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};

		const drawScanlines = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const lineSpacing = 4;
			const lineWidth = 1;

			// Draw moving scanlines
			for (let y = offset; y < canvas.height; y += lineSpacing) {
				// Alternate between cyan and magenta with low opacity
				const isCyan = Math.floor(y / lineSpacing) % 2 === 0;
				ctx.strokeStyle = isCyan
					? 'rgba(0, 255, 255, 0.15)'
					: 'rgba(255, 0, 255, 0.1)';
				ctx.lineWidth = lineWidth;

				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}
		};

		const animate = () => {
			offset += 0.5;
			if (offset >= 4) {
				offset = 0;
			}
			drawScanlines();
			animationFrameId = requestAnimationFrame(animate);
		};

		resizeCanvas();
		animate();

		const resizeHandler = () => {
			resizeCanvas();
		};

		window.addEventListener('resize', resizeHandler);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);

	return (
		<section className={`stats ${isVisible ? "visible" : ""}`} ref={statsRef}>
			<canvas ref={canvasRef} className="tron-grid-canvas"></canvas>
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
