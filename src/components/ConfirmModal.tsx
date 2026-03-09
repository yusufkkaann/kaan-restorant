import React from "react"
import ReactDOM from "react-dom"

interface ConfirmModalProps {
	id: string
	title: string
	message: string
	onConfirm: () => void
	confirmText?: string
	cancelText?: string
	type?: "danger" | "warning" | "primary"
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ id, title, message, onConfirm, confirmText = "Evet, Sil", cancelText = "İptal", type = "danger" }) => {
	const getIcon = () => {
		switch (type) {
			case "danger":
				return <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3 animate-fade-in"></i>
			case "warning":
				return <i className="bi bi-exclamation-circle-fill text-warning fs-1 mb-3 animate-fade-in"></i>
			default:
				return <i className="bi bi-info-circle-fill text-primary fs-1 mb-3 animate-fade-in"></i>
		}
	}

	const getConfirmButtonClass = () => {
		switch (type) {
			case "danger":
				return "btn-premium"
			case "warning":
				return "btn-warning text-white fw-bold"
			default:
				return "btn-primary fw-bold"
		}
	}

	return ReactDOM.createPortal(
		<div className="modal fade" id={id} tabIndex={-1} aria-hidden="true" style={{ zIndex: 1060 }}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content premium-card border-0 shadow-lg">
					<div className="modal-body text-center p-5">
						{getIcon()}
						<h3 className="fw-bold mb-3">{title}</h3>
						<p className="text-muted mb-4 fs-5">{message}</p>
						<div className="d-flex justify-content-center gap-3 mt-2">
							<button type="button" className="btn btn-light px-4 py-2 fw-semibold rounded-3 border" data-bs-dismiss="modal">
								{cancelText}
							</button>
							<button type="button" className={`btn ${getConfirmButtonClass()} px-4 py-2 shadow-sm`} data-bs-dismiss="modal" onClick={onConfirm}>
								{confirmText}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	)
}

export default ConfirmModal
