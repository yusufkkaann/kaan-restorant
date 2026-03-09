import { useOrders } from "../../features/orders/hooks/useOrders"
import Pagination from "../../components/Pagination"

const OrdersListPage = () => {
	const { orders, loading, error, page, hasMore, nextPage, prevPage } = useOrders(3)

	const getStatusBadge = (status: string) => {
		const badges: Record<string, string> = {
			paid: "bg-success text-white",
			preparing: "bg-info text-white",
			"on-the-way": "bg-primary text-white",
			delivered: "bg-success text-white",
			cancelled: "bg-danger text-white",
		}
		const labels: Record<string, string> = {
			paid: "Ödeme Yapıldı",
			preparing: "Hazırlanıyor",
			"on-the-way": "Yolda",
			delivered: "Teslim Edildi",
			cancelled: "İptal Edildi",
		}
		return <span className={`badge rounded-pill px-3 py-2 ${badges[status] || "bg-secondary"}`}>{labels[status] || status}</span>
	}

	return (
		<div className="container py-5 animate-fade-in px-4">
			<header className="mb-5 text-center text-md-start">
				<h1 className="fw-bold mb-1 display-5">
					<span className="text-danger">Tüm</span> Siparişler
				</h1>
				<p className="text-muted mb-0 fs-5">Sistemdeki tüm siparişlerin durumunu buradan takip edebilirsiniz.</p>
			</header>

			{loading && (
				<div className="text-center py-5">
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Yükleniyor...</span>
					</div>
				</div>
			)}

			{error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}

			{!loading && orders.length === 0 && (
				<div className="text-center py-5 text-muted">
					<div className="fs-1 opacity-25 mb-3">📋</div>
					<h4 className="fw-bold">Henüz sipariş bulunmuyor.</h4>
				</div>
			)}

			{!loading && (
				<div className="row g-4">
					{orders.map(order => (
						<div key={order.id} className="col-12">
							<div className="premium-card p-4 bg-white border-0 shadow-sm hover-translate transition-all">
								<div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
									<div>
										<h5 className="fw-bold mb-1">Sipariş No: #{order.id?.substring(0, 8).toUpperCase()}</h5>
										<p className="text-muted small mb-0">
											<i className="bi bi-calendar3 me-2"></i>
											{order.createdAt?.toDate?.() ? order.createdAt.toDate().toLocaleString("tr-TR") : order.createdAt?.toLocaleString?.("tr-TR") || "Tarih Belirtilmemiş"}
										</p>
									</div>
									{getStatusBadge(order.status)}
								</div>

								<div className="row">
									<div className="col-md-7 border-end">
										<h6 className="fw-bold text-muted small mb-3 text-uppercase">Ürünler</h6>
										{order.items.map((item, idx) => (
											<div key={idx} className="d-flex justify-content-between align-items-center mb-2 pe-md-4">
												<div className="small">
													<span className="fw-bold">{item.quantity}x</span> {item.name}
												</div>
												<div className="fw-bold small">{item.price * item.quantity} ₺</div>
											</div>
										))}
									</div>
									<div className="col-md-5 ps-md-4">
										<h6 className="fw-bold text-muted small mb-3 text-uppercase">Teslimat Bilgileri</h6>
										<p className="small mb-1 fw-bold">{order.customerName}</p>
										<p className="small text-muted mb-3">{order.address}</p>
										<div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-4">
											<span className="fw-bold text-muted small text-uppercase">Toplam</span>
											<h4 className="fw-bold text-danger mb-0">{order.totalPrice} ₺</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{!loading && (orders.length > 0 || page > 1) && <Pagination page={page} hasMore={hasMore} onNext={nextPage} onPrev={prevPage} />}
		</div>
	)
}

export default OrdersListPage
