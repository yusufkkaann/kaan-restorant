import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
	return (
		<div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#fdfdfd" }}>
			<Header />
			<main className="flex-grow-1 py-5">
				<div className="container">
					<Outlet />
				</div>
			</main>
			<footer className="text-center py-5 text-muted bg-white border-top">
				<div className="container">
					<div className="mb-3">
						<span className="fs-5 fw-bold text-dark">
							Kaan <span className="text-danger">Restorant</span>
						</span>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Layout
