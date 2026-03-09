import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import type { Food } from "../../../features/foods/models/food"

interface FoodFormModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (food: Omit<Food, "id" | "createdAt">) => void
	initialData?: Food | null
}

const FoodFormModal: React.FC<FoodFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
	const [name, setName] = useState("")
	const [category, setCategory] = useState("Ana Yemek")
	const [price, setPrice] = useState("")
	const [description, setDescription] = useState("")
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setError(null)
		if (initialData) {
			setName(initialData.name)
			setCategory(initialData.category)
			setPrice(initialData.price.toString())
			setDescription(initialData.description || "")
		} else {
			setName("")
			setCategory("Ana Yemek")
			setPrice("")
			setDescription("")
		}
	}, [initialData, isOpen])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!name.trim()) {
			setError("Lütfen geçerli bir yemek adı giriniz.")
			return
		}

		if (!price || Number(price) <= 0) {
			setError("Lütfen 0'dan büyük geçerli bir fiyat giriniz.")
			return
		}

		setError(null)
		onSave({
			name: name.trim(),
			category,
			price: Number(price),
			description: description.trim(),
		})
	}

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={`modal fade show d-block`} style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", zIndex: 1060 }} tabIndex={-1}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content premium-card border-0 shadow-lg animate-fade-in">
					<div className="modal-header border-0 p-4 pb-0">
						<h3 className="modal-title fw-bold">
							{initialData ? "Yemeği " : "Yeni "}
							<span className="text-danger">{initialData ? "Düzenle" : "Yemek"}</span>
						</h3>
						<button type="button" className="btn-close shadow-none" onClick={onClose}></button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body p-4 pt-4">
							{error && (
								<div className="alert alert-danger py-2 small border-0 shadow-sm mb-4">
									<i className="bi bi-exclamation-triangle-fill me-2"></i>
									{error}
								</div>
							)}
							<div className="mb-4">
								<label className="form-label fw-bold small text-muted text-uppercase mb-2">Yemek Adı</label>
								<input
									type="text"
									className="form-control form-control-lg border-2 shadow-none transition-all"
									value={name}
									onChange={e => {
										setName(e.target.value)
										setError(null)
									}}
									style={{ borderRadius: "12px" }}
									placeholder="Örn: İskender Kebap"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="form-label fw-bold small text-muted text-uppercase mb-2">Kategori</label>
								<select
									className="form-select form-select-lg border-2 shadow-none transition-all"
									value={category}
									onChange={e => {
										setCategory(e.target.value)
										setError(null)
									}}
									style={{ borderRadius: "12px" }}
								>
									<option value="Çorba">Çorba</option>
									<option value="Ana Yemek">Ana Yemek</option>
									<option value="Ara Sıcak">Ara Sıcak</option>
									<option value="Tatlı">Tatlı</option>
									<option value="İçecek">İçecek</option>
								</select>
							</div>
							<div className="mb-4">
								<label className="form-label fw-bold small text-muted text-uppercase mb-2">Açıklama</label>
								<textarea className="form-control border-2 shadow-none transition-all" value={description} onChange={e => setDescription(e.target.value)} style={{ borderRadius: "12px", minHeight: "100px" }} placeholder="Yemeğin içeriği hakkında kısa bilgi..."></textarea>
							</div>
							<div className="mb-2">
								<label className="form-label fw-bold small text-muted text-uppercase mb-2">Fiyat (TL)</label>
								<div className="input-group input-group-lg shadow-none">
									<input
										type="number"
										className="form-control border-2 border-end-0 shadow-none transition-all"
										value={price}
										onChange={e => {
											setPrice(e.target.value)
											setError(null)
										}}
										style={{ borderRadius: "12px 0 0 12px" }}
										placeholder="0.00"
										step="0.01"
										required
									/>
									<span className="input-group-text bg-light border-2 border-start-0 text-muted fw-bold px-4" style={{ borderRadius: "0 12px 12px 0" }}>
										TL
									</span>
								</div>
							</div>
						</div>
						<div className="modal-footer border-0 p-4">
							<button type="button" className="btn btn-light px-4 py-2 fw-bold rounded-3 me-2 border" onClick={onClose}>
								İptal
							</button>
							<button type="submit" className="btn btn-premium px-4 py-2 fw-bold shadow">
								{initialData ? "Güncelle" : "Kaydet"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>,
		document.body,
	)
}

export default FoodFormModal
