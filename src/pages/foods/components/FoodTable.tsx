import Pagination from "../../../components/Pagination"
import type { Food } from "../../../features/foods/models/food"

interface FoodTableProps {
	foods: Food[]
	onDelete?: (id: string) => void
	onEdit?: (food: Food) => void
	page: number
	hasMore: boolean
	onNext: () => void
	onPrev: () => void
}

const FoodTable: React.FC<FoodTableProps> = ({ foods, onDelete, onEdit, page, hasMore, onNext, onPrev }) => {
	return (
		<div>
			<div className="table-responsive">
				<table className="table premium-table table-hover align-middle mb-0">
					<thead>
						<tr>
							<th className="px-4">#</th>
							<th>Yemek Bilgisi</th>
							<th>Kategori</th>
							<th>Fiyat</th>

							<th className="px-4 text-end">İşlemler</th>
						</tr>
					</thead>
					<tbody>
						{foods.length === 0 ? (
							<tr>
								<td colSpan={6} className="text-center py-5 text-muted bg-white">
									<div className="py-4">
										<i className="bi bi-inbox fs-1 opacity-25 d-block mb-3"></i>
										Henüz yemek eklenmemiş.
									</div>
								</td>
							</tr>
						) : (
							foods.map((food, index) => (
								<tr key={food.id}>
									<td className="px-4 fw-bold text-muted small">{(page - 1) * 3 + index + 1}</td>
									<td>
										<div className="d-flex align-items-center">
											<div className="bg-light rounded-3 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
												<span className="fs-4">🍲</span>
											</div>
											<div>
												<div className="fw-bold text-dark">{food.name}</div>
											</div>
										</div>
									</td>
									<td>
										<span className="badge rounded-pill px-3 py-2 fw-semibold text-danger border border-danger-subtle bg-danger-subtle" style={{ fontSize: "0.75rem" }}>
											{food.category}
										</span>
									</td>
									<td className="fw-bold text-dark fs-5">
										{food.price} <small className="fw-normal text-muted fs-6">TL</small>
									</td>

									<td className="px-4 text-end">
										<div className="d-flex justify-content-end gap-2">
											<button className="btn btn-outline-primary border-0 btn-sm p-2 rounded-3 hover-shadow" onClick={() => onEdit?.(food)} title="Düzenle">
												<i className="bi bi-pencil-square fs-5"></i>
											</button>
											<button className="btn btn-outline-danger border-0 btn-sm p-2 rounded-3 hover-shadow" onClick={() => onDelete?.(food.id)} title="Sil" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">
												<i className="bi bi-trash3 fs-5"></i>
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<Pagination page={page} hasMore={hasMore} onNext={onNext} onPrev={onPrev} variant="table" />
		</div>
	)
}

export default FoodTable
