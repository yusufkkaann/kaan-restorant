import { useState } from "react"
import FoodTable from "./components/FoodTable"
import FoodFormModal from "./components/FoodFormModal"
import ConfirmModal from "../../components/ConfirmModal"
import { useFoods } from "../../features/foods/hooks/useFoods"
import type { Food } from "../../features/foods/models/food"

const FoodsPage = () => {
	const { foods, loading, error, page, hasMore, nextPage, prevPage, addFood, updateFood, deleteFood } = useFoods(3)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingFood, setEditingFood] = useState<Food | null>(null)
	const [deleteId, setDeleteId] = useState<string | null>(null)

	const handleOpenModal = (food: Food | null = null) => {
		setEditingFood(food)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setEditingFood(null)
		setIsModalOpen(false)
	}

	const handleSaveFood = async (formData: Omit<Food, "id" | "createdAt">) => {
		try {
			if (editingFood) {
				await updateFood(editingFood.id, formData)
			} else {
				await addFood(formData)
			}
			handleCloseModal()
		} catch (err) {
			alert("İşlem sırasında bir hata oluştu.")
		}
	}

	const handleDeleteConfirm = async () => {
		if (!deleteId) return
		try {
			await deleteFood(deleteId)
			setDeleteId(null)
		} catch (err) {
			alert("Yemek silinirken bir hata oluştu.")
		}
	}

	const openDeleteConfirm = (id: string) => {
		setDeleteId(id)
	}

	return (
		<div className="p-2 animate-fade-in">
			<div className="d-flex justify-content-between align-items-center mb-5">
				<div>
					<h1 className="fw-bold mb-1 display-5">
						<span className="text-danger">Yemek</span> Yönetimi
					</h1>
					<p className="text-muted mb-0 fs-5">Menünüzdeki tüm lezzetleri buradan yönetebilirsiniz.</p>
				</div>
				<button className="btn btn-premium shadow-lg px-4 py-2 d-flex align-items-center gap-2" onClick={() => handleOpenModal()}>
					<i className="bi bi-plus-lg fs-4"></i> Yeni Yemek Ekle
				</button>
			</div>

			{error && <div className="alert alert-danger border-0 shadow-sm mb-4">{error}</div>}

			<div className="row">
				<div className="col-12">
					<div className="premium-card bg-white">
						<div className="card-body p-0 position-relative">
							{loading && (
								<div className="position-absolute top-50 start-50 translate-middle z-3">
									<div className="spinner-border text-danger" role="status">
										<span className="visually-hidden">Yükleniyor...</span>
									</div>
								</div>
							)}
							<div style={{ opacity: loading ? 0.5 : 1 }}>
								<FoodTable foods={foods} onDelete={openDeleteConfirm} onEdit={handleOpenModal} page={page} hasMore={hasMore} onNext={nextPage} onPrev={prevPage} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<FoodFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveFood} initialData={editingFood} />

			<ConfirmModal id="deleteConfirmModal" title="Yemeği Sil?" message="Bu yemeği silmek istediğinize emin misiniz? Bu işlem geri alınamaz." onConfirm={handleDeleteConfirm} type="danger" />
		</div>
	)
}

export default FoodsPage
