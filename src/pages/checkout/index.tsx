import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { clearCart, incrementQuantity, decrementQuantity, removeFromCart } from "../../features/cart/cartSlice"
import { createOrder } from "../../features/orders/services/orderService"
import type { OrderItem } from "../../features/orders/models/order"
import CreditCard from "./components/CreditCard"

const CheckoutPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(state => state.cart.items)
	const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

	const [formData, setFormData] = useState({
		fullName: "", // Siparişi veren / Teslim alacak kişi
		address: "",
		cardHolderName: "", // Kart üzerindeki isim
		cardNumber: "",
		expiry: "",
		cvv: "",
	})

	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		let formattedValue = value

		if (name === "cardNumber") {
			formattedValue = value.replace(/\D/g, "")
		} else if (name === "expiry") {
			const digits = value.replace(/\D/g, "")
			if (digits.length >= 2) {
				formattedValue = `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
			} else {
				formattedValue = digits
			}
		} else if (name === "cvv") {
			formattedValue = value.replace(/\D/g, "")
		}

		setFormData(prev => ({ ...prev, [name]: formattedValue }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (cartItems.length === 0) return

		setLoading(true)

		try {
			const orderItems: OrderItem[] = cartItems.map(item => ({
				foodId: item.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			}))

			await createOrder({
				customerName: formData.fullName,
				address: formData.address,
				totalPrice: totalPrice,
				items: orderItems,
			})

			dispatch(clearCart())
			handleCloseModal()
		} catch (error) {
			alert("Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const handleCloseModal = () => {
		setShowModal(false)
		navigate("/siparislerim")
	}

	if (cartItems.length === 0) {
		return (
			<div className="container py-5 text-center px-4">
				<div className="premium-card p-5 bg-white border-0 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
					<i className="bi bi-cart-x text-muted mb-4 opacity-50" style={{ fontSize: "5rem" }}></i>
					<h2 className="fw-bold mb-3 text-dark">Sepetiniz Boş</h2>
					<p className="text-muted mb-4">Ödeme yapabilmek için sepetinizde en az bir ürün bulunmalıdır.</p>
					<button className="btn btn-premium px-5 py-2" onClick={() => navigate("/siparis-ver")}>
						Menüye Dön
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="container py-5 animate-fade-in px-4">
			<div className="row g-5">
				{/* Sol Kolon - Form */}
				<div className="col-lg-7">
					<div className="premium-card p-4 p-md-5 bg-white border-0 shadow-sm h-100">
						<h2 className="fw-bold mb-4">
							<span className="text-danger">Ödeme</span> Bilgileri
						</h2>
						<form onSubmit={handleSubmit}>
							{/* Kişisel Bilgiler */}
							<div className="mb-4">
								<h5 className="fw-bold mb-3 border-bottom pb-2">Teslimat Bilgileri</h5>
								<div className="mb-3">
									<label className="form-label small fw-bold text-muted">TESLİMAT YAPILACAK KİŞİ (AD SOYAD)</label>
									<input type="text" className="form-control form-control-lg border-2 shadow-none" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Kimin adına gelecek?" required style={{ borderRadius: "12px" }} />
								</div>
								<div className="mb-3">
									<label className="form-label small fw-bold text-muted">TESLİMAT ADRESİ</label>
									<textarea className="form-control border-2 shadow-none" name="address" value={formData.address} onChange={handleInputChange} rows={3} placeholder="Yemeğiniz nereye gelsin?" required style={{ borderRadius: "12px" }}></textarea>
								</div>
							</div>

							{/* Kart Bilgileri */}
							<div className="mb-4">
								<h5 className="fw-bold mb-3 border-bottom pb-2">Kart Bilgileri</h5>
								<div className="row g-3">
									<div className="col-12">
										<label className="form-label small fw-bold text-muted">KART ÜZERİNDEKİ İSİM</label>
										<input type="text" className="form-control form-control-lg border-2 shadow-none" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} placeholder="Kartın üzerindeki isim" required style={{ borderRadius: "12px" }} />
									</div>
									<div className="col-12">
										<label className="form-label small fw-bold text-muted">KART NUMARASI</label>
										<input type="text" className="form-control form-control-lg border-2 shadow-none" name="cardNumber" maxLength={16} value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" required style={{ borderRadius: "12px" }} />
									</div>
									<div className="col-md-6">
										<label className="form-label small fw-bold text-muted">SON KULLANMA</label>
										<input type="text" className="form-control form-control-lg border-2 shadow-none" name="expiry" maxLength={5} value={formData.expiry} onChange={handleInputChange} placeholder="AA/YY" required style={{ borderRadius: "12px" }} />
									</div>
									<div className="col-md-6">
										<label className="form-label small fw-bold text-muted">CVV</label>
										<input type="password" className="form-control form-control-lg border-2 shadow-none" name="cvv" maxLength={3} value={formData.cvv} onChange={handleInputChange} placeholder="•••" required style={{ borderRadius: "12px" }} />
									</div>
								</div>
							</div>

							<button type="submit" className="btn btn-premium w-100 py-3 fw-bold fs-5 mt-4 shadow d-flex align-items-center justify-content-center gap-2" disabled={loading}>
								{loading ? (
									<>
										<span className="spinner-border spinner-border-sm" role="status"></span>
										İşleniyor...
									</>
								) : (
									<>
										<i className="bi bi-shield-check fs-4"></i>
										Ödemeyi Güvenle Tamamla ({totalPrice} ₺)
									</>
								)}
							</button>
						</form>
					</div>
				</div>

				{/* Sağ Kolon - Önizleme ve Özet */}
				<div className="col-lg-5">
					<div className="sticky-top" style={{ top: "100px" }}>
						{/* Kart Önizlemesi */}
						<CreditCard number={formData.cardNumber} name={formData.cardHolderName} expiry={formData.expiry} cvv={formData.cvv} />

						{/* Sipariş Özeti */}
						<div className="premium-card p-4 bg-white border-0 shadow-sm mt-4">
							<div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
								<h5 className="fw-bold mb-0">Sipariş Özeti</h5>
								<button className="btn btn-sm btn-outline-danger border-0 rounded-pill px-3" onClick={() => dispatch(clearCart())}>
									<i className="bi bi-trash3 me-1"></i> Temizle
								</button>
							</div>

							<div className="mb-4" style={{ maxHeight: "300px", overflowY: "auto" }}>
								{cartItems.map(item => (
									<div key={item.id} className="d-flex align-items-center gap-3 mb-3 p-2 rounded-3 hover-bg-light transition-all border border-light">
										<div className="flex-grow-1">
											<div className="fw-bold small text-truncate" style={{ maxWidth: "150px" }}>
												{item.name}
											</div>
											<div className="text-muted" style={{ fontSize: "11px" }}>
												{item.price} ₺ x {item.quantity}
											</div>
										</div>

										<div className="d-flex align-items-center gap-2 bg-light rounded-pill px-2 py-1 border shadow-sm scale-90">
											<button className="btn btn-link link-dark p-0 text-decoration-none sm-btn" onClick={() => dispatch(decrementQuantity(item.id))}>
												<i className="bi bi-dash-lg"></i>
											</button>
											<span className="fw-bold small" style={{ minWidth: "15px", textAlign: "center" }}>
												{item.quantity}
											</span>
											<button className="btn btn-link link-dark p-0 text-decoration-none sm-btn" onClick={() => dispatch(incrementQuantity(item.id))}>
												<i className="bi bi-plus-lg"></i>
											</button>
										</div>

										<div className="text-end fw-bold text-danger small" style={{ minWidth: "60px" }}>
											{item.price * item.quantity} ₺
										</div>

										<button className="btn btn-link link-danger p-0 opacity-50 hover-opacity-100" onClick={() => dispatch(removeFromCart(item.id))}>
											<i className="bi bi-x-circle-fill"></i>
										</button>
									</div>
								))}
							</div>
							<div className="border-top pt-3 d-flex justify-content-between align-items-center">
								<span className="fw-bold text-muted">Toplam Tutar</span>
								<h3 className="fw-bold text-danger mb-0">{totalPrice} ₺</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.hover-bg-light:hover { background-color: #f8f9fa; }
				.scale-90 { transform: scale(0.9); }
				.sm-btn { font-size: 12px; }
				.transition-all { transition: all 0.2s ease; }
			`}</style>

			{/* Başarı Modalı */}
			{showModal && (
				<div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex={-1}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
							<div className="modal-body text-center p-5">
								<div className="mb-4">
									<i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
								</div>
								<h2 className="fw-bold mb-3">Sipariş Alındı!</h2>
								<p className="text-muted mb-4 fs-5">Siparişiniz başarıyla oluşturuldu. Siparişlerim sayfasından durumunu takip edebilirsiniz. 🎉</p>
								<button type="button" className="btn btn-premium w-100 py-3 fw-bold rounded-pill" onClick={handleCloseModal}>
									Tamam
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default CheckoutPage
