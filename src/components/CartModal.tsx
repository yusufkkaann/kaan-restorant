import React from "react"
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "../features/cart/cartSlice"

interface CartModalProps {
	isOpen: boolean
	onClose: () => void
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)
	const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

	const handleGoToCheckout = () => {
		onClose()
		navigate("/odeme")
	}

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 1070 }} tabIndex={-1}>
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content border-0 shadow-lg" style={{ borderRadius: "24px", overflow: "hidden" }}>
					<div className="modal-header border-0 p-4" style={{ background: "var(--bg-gradient)", color: "white" }}>
						<div className="d-flex align-items-center gap-3">
							<i className="bi bi-bag-heart-fill fs-3"></i>
							<div>
								<h4 className="modal-title fw-bold mb-0">Sepetiniz</h4>
								<p className="mb-0 opacity-75 small">{cartItems.length} lezzet seçildi</p>
							</div>
						</div>
						<button type="button" className="btn-close btn-close-white shadow-none" onClick={onClose}></button>
					</div>

					<div className="modal-body p-0" style={{ maxHeight: "60vh", overflowY: "auto" }}>
						{cartItems.length === 0 ? (
							<div className="p-5 text-center">
								<div className="mb-4 opacity-25">
									<i className="bi bi-cart-x" style={{ fontSize: "5rem" }}></i>
								</div>
								<h5 className="fw-bold text-muted">Sepetiniz şu an boş.</h5>
								<p className="text-muted mb-4">Lezzet dolu menümüzden seçiminizi yapmaya ne dersiniz?</p>
								<button className="btn btn-premium px-5" onClick={onClose}>
									Menüye Dön
								</button>
							</div>
						) : (
							<div className="p-4">
								{cartItems.map(item => (
									<div key={item.id} className="d-flex align-items-center gap-3 mb-4 p-3 rounded-4 bg-light bg-opacity-50 border border-white">
										<div className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center border" style={{ width: "60px", height: "60px" }}>
											<span className="fs-3">🍲</span>
										</div>
										<div className="flex-grow-1">
											<h6 className="fw-bold mb-1">{item.name}</h6>
											<p className="text-muted small mb-0">{item.price} ₺ / adet</p>
										</div>
										<div className="d-flex align-items-center gap-3 bg-white rounded-pill px-3 py-1 border shadow-sm">
											<button className="btn btn-link link-dark p-0 text-decoration-none" onClick={() => dispatch(decrementQuantity(item.id))}>
												<i className="bi bi-dash-lg"></i>
											</button>
											<span className="fw-bold" style={{ minWidth: "20px", textAlign: "center" }}>
												{item.quantity}
											</span>
											<button className="btn btn-link link-dark p-0 text-decoration-none" onClick={() => dispatch(incrementQuantity(item.id))}>
												<i className="bi bi-plus-lg"></i>
											</button>
										</div>
										<div className="text-end" style={{ minWidth: "80px" }}>
											<div className="fw-bold text-danger">{item.price * item.quantity} ₺</div>
										</div>
										<button className="btn btn-link link-danger p-0 ms-2 opacity-50 hover-opacity-100" onClick={() => dispatch(removeFromCart(item.id))}>
											<i className="bi bi-trash-fill fs-5"></i>
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					{cartItems.length > 0 && (
						<div className="modal-footer border-0 p-4 bg-light bg-opacity-50">
							<div className="w-100">
								<div className="d-flex justify-content-between align-items-center mb-4 px-2">
									<div>
										<h6 className="text-muted mb-1">Toplam Tutar</h6>
										<h3 className="fw-bold mb-0 text-dark">{totalPrice} ₺</h3>
									</div>
									<button className="btn btn-link link-muted text-decoration-none p-0" onClick={() => dispatch(clearCart())}>
										Sepeti Temizle
									</button>
								</div>
								<button className="btn btn-premium w-100 py-3 fw-bold fs-5 shadow-lg d-flex align-items-center justify-content-center gap-2" onClick={handleGoToCheckout}>
									<i className="bi bi-wallet2 fs-4"></i>
									Ödemeye Geç
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>,
		document.body,
	)
}

export default CartModal
