export type OrderStatus = "paid" | "preparing" | "on-the-way" | "delivered" | "cancelled"

export interface OrderItem {
	foodId: string
	name: string
	price: number
	quantity: number
}

export interface Order {
	id?: string
	customerName: string
	address: string
	totalPrice: number
	status: OrderStatus
	items: OrderItem[]
	createdAt: any // Firestore Timestamp
}
export interface PaginatedOrders {
	orders: Order[]
	lastVisible: any
}
