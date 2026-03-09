import React from "react"

interface PaginationProps {
	page: number
	hasMore: boolean
	onNext: () => void
	onPrev: () => void
	variant?: "centered" | "table"
}

const Pagination: React.FC<PaginationProps> = ({ page, hasMore, onNext, onPrev, variant = "centered" }) => {
	if (variant === "table") {
		return (
			<div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-top rounded-bottom-4">
				<div className="text-muted small">
					Sayfa <span className="fw-bold text-dark">{page}</span> gösteriliyor
				</div>
				<div className="d-flex gap-2">
					<button className="btn btn-light btn-sm px-3 py-2 fw-semibold rounded-3 border transition-all" onClick={onPrev} disabled={page === 1} style={{ opacity: page === 1 ? 0.5 : 1 }}>
						<i className="bi bi-chevron-left me-1"></i> Önceki
					</button>
					<button className="btn btn-light btn-sm px-3 py-2 fw-semibold rounded-3 border transition-all" onClick={onNext} disabled={!hasMore} style={{ opacity: !hasMore ? 0.5 : 1 }}>
						Sonraki <i className="bi bi-chevron-right ms-1"></i>
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="d-flex justify-content-center align-items-center gap-4 mt-5">
			<button className="btn btn-secondary-premium shadow-sm border-2 px-4 py-2" onClick={onPrev} disabled={page === 1} style={{ opacity: page === 1 ? 0.5 : 1 }}>
				<i className="bi bi-chevron-left me-2"></i> Önceki
			</button>

			<div className="fw-bold fs-5 text-danger px-3 py-2 rounded-circle bg-light border border-danger-subtle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "50px", height: "50px" }}>
				{page}
			</div>

			<button className="btn btn-premium shadow-lg border-0 px-4 py-2" onClick={onNext} disabled={!hasMore} style={{ opacity: !hasMore ? 0.5 : 1 }}>
				Sonraki <i className="bi bi-chevron-right ms-2"></i>
			</button>
		</div>
	)
}

export default Pagination
