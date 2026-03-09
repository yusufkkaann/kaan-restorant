import type { Food } from "../../../features/foods/models/food"

interface FoodCardProps {
	food: Food
	onOrder?: (food: Food) => void
}

const FoodCard = ({ food, onOrder }: FoodCardProps) => {
	// Simple placeholder mapping based on category or just a general one
	const placeholderImage = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80`

	return (
		<div className="premium-card bg-white h-100 animate-fade-in shadow-sm border-0">
			<div className="position-relative overflow-hidden" style={{ height: "220px" }}>
				<img src={placeholderImage} className="w-100 h-100 object-fit-cover transition-all" alt={food.name} />
				<div className="position-absolute top-0 start-0 m-3">
					<span className="badge bg-white text-danger fw-bold rounded-pill px-3 py-2 shadow-sm border border-danger-subtle">{food.category}</span>
				</div>
			</div>
			<div className="card-body p-4 d-flex flex-column">
				<div className="d-flex justify-content-between align-items-start mb-3">
					<h4 className="fw-bold mb-0 flex-grow-1 text-truncate pe-2">{food.name}</h4>
					<div className="text-danger fw-bold fs-5 text-nowrap">{food.price} ₺</div>
				</div>
				<p className="text-muted small flex-grow-1 mb-4">{food.description || "Bu lezzetli yemek için henüz bir açıklama eklenmemiş."}</p>
				<button className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2 border-0" onClick={() => onOrder?.(food)}>
					<i className="bi bi-cart-plus-fill fs-5"></i> Sepete Ekle
				</button>
			</div>

			<style>{`
				.premium-card:hover img {
					transform: scale(1.1);
				}
			`}</style>
		</div>
	)
}

export default FoodCard
