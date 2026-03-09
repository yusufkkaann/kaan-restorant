import { useAppDispatch } from "../../app/hooks"
import { useFoods } from "../../features/foods/hooks/useFoods"
import { addToCart } from "../../features/cart/cartSlice"
import FoodCard from "./components/FoodCard"
import Pagination from "../../components/Pagination"
import type { Food } from "../../features/foods/models/food"

const CATEGORIES = ["Tümü", "Çorba", "Ana Yemek", "Ara Sıcak", "Tatlı", "İçecek"]

const OrdersPage = () => {
	const dispatch = useAppDispatch()
	const { foods, loading, error, page, hasMore, category, searchTerm, setCategory, setSearchTerm, nextPage, prevPage } = useFoods(4)

	const handleOrder = (food: Food) => {
		dispatch(addToCart(food))
	}

	return (
		<div className="p-2 animate-fade-in">
			<header className="mb-5 d-flex flex-column gap-3">
				<div className="text-center text-md-start">
					<h1 className="fw-bold mb-1 display-5">
						<span className="text-danger">Lezzet</span> Menüsü
					</h1>
					<p className="text-muted mb-0 fs-5">En taze malzemelerle hazırlanan eşsiz yemeklerimizi keşfedin.</p>
				</div>

				<div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-center justify-content-between mt-2">
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
				</div>
			</header>

			{error && <div className="alert alert-danger border-0 shadow-sm mb-4">{error}</div>}

			<div className="row g-4 position-relative">
				{loading && (
					<div className="position-absolute w-100 h-100 top-0 start-0 z-3 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: "20px" }}>
						<div className="spinner-border text-danger" role="status">
							<span className="visually-hidden">Yükleniyor...</span>
						</div>
					</div>
				)}

				{foods.length === 0 && !loading && (
					<div className="col-12 text-center py-5 rounded-4 bg-light shadow-inner">
						<div className="fs-1 mb-3">🍽️</div>
						<h3 className="text-muted fw-bold">Yemek bulunamadı.</h3>
						<p className="text-muted">Arama kriterlerinizi değiştirmeyi deneyebilirsiniz.</p>
					</div>
				)}

				{foods.map(food => (
					<div key={food.id} className="col-12 col-md-6 col-lg-3">
						<FoodCard food={food} onOrder={handleOrder} />
					</div>
				))}
			</div>

			<div className="mt-5">
				<Pagination page={page} hasMore={hasMore} onNext={nextPage} onPrev={prevPage} />
			</div>

			<style>{`
				.categories-scroll::-webkit-scrollbar {
					display: none;
				}
				.whitespace-nowrap {
					white-space: nowrap;
				}
				.shadow-inner {
					box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
				}
                .transition-all {
                    transition: all 0.2s ease-in-out;
                }
			`}</style>
		</div>
	)
}

export default OrdersPage
