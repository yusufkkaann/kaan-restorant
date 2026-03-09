import React from "react"

interface CreditCardProps {
	number: string
	name: string
	expiry: string
	cvv: string
}

const CreditCard: React.FC<CreditCardProps> = ({ number, name, expiry, cvv }) => {
	const maskNumber = (num: string) => {
		const cleanNum = num.replace(/\s/g, "")
		const filled = cleanNum.padEnd(16, "•")
		return filled
			.substring(0, 16)
			.replace(/(.{4})/g, "$1 ")
			.trim()
	}

	return (
		<div className="credit-card-container mb-4 mx-auto" style={{ perspective: "1000px", width: "100%", maxWidth: "400px" }}>
			<div
				className="credit-card position-relative shadow-lg p-4 d-flex flex-column justify-content-between mx-auto"
				style={{
					width: "100%",
					aspectRatio: "1.6 / 1",
					background: "linear-gradient(135deg, #1d3557 0%, #457b9d 100%)",
					borderRadius: "20px",
					color: "white",
					boxShadow: "0 15px 35px rgba(29, 53, 87, 0.3)",
				}}
			>
				{/* Top Section */}
				<div className="d-flex justify-content-between align-items-center">
					<div className="card-chip">
						<svg width="45" height="35" viewBox="0 0 45 35" fill="none">
							<rect width="45" height="35" rx="5" fill="#FFC107" fillOpacity="0.8" />
							<path d="M0 12.5H15M0 22.5H15M30 12.5H45M30 22.5H45M15 0V35M30 0V35" stroke="rgba(0,0,0,0.2)" />
						</svg>
					</div>
					<i className="bi bi-credit-card-2-front fs-2 opacity-50"></i>
				</div>

				{/* Number Section */}
				<div className="card-number-wrapper my-3">
					<div className="card-number fw-bold text-center tracking-wider" style={{ letterSpacing: "3px", fontSize: "1.4rem", fontFamily: "'Monaco', monospace" }}>
						{maskNumber(number)}
					</div>
				</div>

				{/* Bottom Section */}
				<div className="d-flex justify-content-between align-items-end">
					<div className="flex-grow-1 overflow-hidden">
						<div className="small opacity-75 text-uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "1px" }}>
							Kart Sahibi
						</div>
						<div className="fw-bold text-truncate text-uppercase" style={{ fontSize: "14px", letterSpacing: "1px" }}>
							{name || "AD SOYAD"}
						</div>
					</div>
					<div className="d-flex gap-4 ms-3">
						<div className="text-end">
							<div className="small opacity-75 text-uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "1px" }}>
								Sön Tarih
							</div>
							<div className="fw-bold" style={{ fontSize: "14px" }}>
								{expiry || "MM/YY"}
							</div>
						</div>
						<div className="text-end">
							<div className="small opacity-75 text-uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "1px" }}>
								CVV
							</div>
							<div className="fw-bold" style={{ fontSize: "14px" }}>
								{cvv || "•••"}
							</div>
						</div>
					</div>
				</div>

				{/* Decorative Elements */}
				<div className="position-absolute" style={{ top: "10%", right: "10%", width: "100px", height: "100px", background: "white", opacity: "0.05", borderRadius: "50%", pointerEvents: "none" }}></div>
			</div>

			<style>{`
				.credit-card {
					background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.1) 0%, transparent 40%),
									 radial-gradient(circle at 90% 90%, rgba(255,255,255,0.05) 0%, transparent 40%);
					transition: all 0.3s ease;
				}
				.credit-card:hover {
					transform: translateY(-5px) rotateX(5deg);
					box-shadow: 0 20px 45px rgba(29, 53, 87, 0.4);
				}
			`}</style>
		</div>
	)
}

export default CreditCard
