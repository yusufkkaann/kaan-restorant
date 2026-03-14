import { useAppDispatch } from "../../app/hooks"
import { useFoods } from "../../features/foods/hooks/useFoods"
import { addToCart } from "../../features/cart/cartSlice"
import FoodCard from "./components/FoodCard"
import Pagination from "../../components/Pagination"
import FoodFilters from "../foods/components/FoodFilters"
import type { Food } from "../../features/foods/models/food"

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

				<FoodFilters category={category} searchTerm={searchTerm} setCategory={setCategory} setSearchTerm={setSearchTerm} />
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
				.shadow-inner {
					box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
				}
			`}</style>

		</div>
	)
}

export default OrdersPage
