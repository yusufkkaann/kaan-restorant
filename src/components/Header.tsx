import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setCartOpen } from "../features/cart/cartSlice"
import CartModal from "./CartModal"

const Header = () => {
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)
	const isCartOpen = useAppSelector(state => state.cart.isCartOpen)
	const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark border-bottom sticky-top py-3" style={{ background: "var(--bg-gradient)", boxShadow: "0 4px 15px rgba(230, 57, 70, 0.2)" }}>
				<div className="container">
					<NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
						<span className="fs-4 tracking-tight">
							Kaan <span className="fw-light">Restorant</span>
						</span>
					</NavLink>
					<button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav ms-auto gap-2 align-items-center">
							<NavLink className={({ isActive }) => `nav-link px-4 py-2 rounded-pill transition-all ${isActive ? "bg-white text-danger fw-bold shadow-sm" : "text-white opacity-75"}`} to="/">
								<i className="bi bi-grid-fill me-2"></i>
								Yemek Yönetimi
							</NavLink>
							<NavLink className={({ isActive }) => `nav-link px-4 py-2 rounded-pill transition-all ${isActive ? "bg-white text-danger fw-bold shadow-sm" : "text-white opacity-75"}`} to="/siparis-ver">
								<i className="bi bi-cart-fill me-2"></i>
								Sipariş Ver
							</NavLink>
							<NavLink className={({ isActive }) => `nav-link px-4 py-2 rounded-pill transition-all ${isActive ? "bg-white text-danger fw-bold shadow-sm" : "text-white opacity-75"}`} to="/siparislerim">
								<i className="bi bi-clock-history me-2"></i>
								Siparişlerim
							</NavLink>

							<button className="btn btn-light rounded-pill px-4 py-2 ms-lg-3 d-flex align-items-center gap-2 shadow-sm text-danger fw-bold position-relative" onClick={() => dispatch(setCartOpen(true))}>
								<i className="bi bi-bag-heart-fill fs-5"></i>
								<span className="d-none d-sm-inline">Sepetim</span>
								{cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark border border-white">{cartCount}</span>}
							</button>
						</div>
					</div>
				</div>
			</nav>
			<CartModal isOpen={isCartOpen} onClose={() => dispatch(setCartOpen(false))} />
		</>
	)
}

export default Header
