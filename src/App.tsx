import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import FoodsPage from "./pages/foods"
import OrdersPage from "./pages/orders"
import CheckoutPage from "./pages/checkout"
import OrdersListPage from "./pages/orders-list"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<FoodsPage />} />
					<Route path="siparis-ver" element={<OrdersPage />} />
					<Route path="odeme" element={<CheckoutPage />} />
					<Route path="siparislerim" element={<OrdersListPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
