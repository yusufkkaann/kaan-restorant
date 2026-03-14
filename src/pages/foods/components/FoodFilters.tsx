import React from "react"
import { CATEGORIES } from "../../../features/foods/models/food"

interface FoodFiltersProps {
	category: string
	searchTerm: string
	setCategory: (category: string) => void
	setSearchTerm: (searchTerm: string) => void
}

const FoodFilters: React.FC<FoodFiltersProps> = ({ category, searchTerm, setCategory, setSearchTerm }) => {
	return (
		<div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-center justify-content-between mb-4">
			{/* Category Tabs */}
			<div className="d-flex overflow-auto pb-2 gap-2 categories-scroll" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
				{CATEGORIES.map(cat => (
					<button key={cat} onClick={() => setCategory(cat)} className={`btn btn-sm px-4 py-2 rounded-pill fw-bold transition-all whitespace-nowrap ${category === cat ? "btn-danger shadow-sm" : "btn-light border text-muted"}`} style={{ minWidth: "max-content", fontSize: "0.9rem" }}>
						{cat}
					</button>
				))}
			</div>

			{/* Search Bar */}
			<div className="position-relative" style={{ minWidth: "300px" }}>
				<i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
				<input type="text" className="form-control form-control-lg ps-5 border-2 shadow-sm" placeholder="Yemek ara..." style={{ borderRadius: "15px", fontSize: "1rem" }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
				{searchTerm && (
					<button onClick={() => setSearchTerm("")} className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted p-0 shadow-none">
						<i className="bi bi-x-circle-fill"></i>
					</button>
				)}
			</div>

			<style>{`
				.categories-scroll::-webkit-scrollbar {
					display: none;
				}
				.whitespace-nowrap {
					white-space: nowrap;
				}
				.transition-all {
					transition: all 0.2s ease-in-out;
				}
			`}</style>
		</div>
	)
}

export default FoodFilters
