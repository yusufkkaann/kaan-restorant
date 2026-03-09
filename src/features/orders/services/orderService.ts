import { db } from "../../../firebase/config"
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore"
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import type { Order, PaginatedOrders } from "../models/order"

const ORDERS_COLLECTION = "orders"

export const createOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
	try {
		const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
			...orderData,
			status: "paid",
			createdAt: serverTimestamp(),
		})
		return docRef.id
	} catch (error) {
		console.error("Error creating order: ", error)
		throw error
	}
}

export const getOrders = async (pageSize: number = 3, lastDoc?: QueryDocumentSnapshot<DocumentData> | null): Promise<PaginatedOrders & { hasMore: boolean }> => {
	try {
		let q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"), limit(pageSize + 1))

		if (lastDoc) {
			q = query(q, startAfter(lastDoc))
		}

		const querySnapshot = await getDocs(q)
		const allDocs = querySnapshot.docs
		const hasMore = allDocs.length > pageSize
		const pagedDocs = hasMore ? allDocs.slice(0, pageSize) : allDocs

		const orders = pagedDocs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as Order[]

		return {
			orders,
			lastVisible: pagedDocs[pagedDocs.length - 1] || null,
			hasMore,
		}
	} catch (error) {
		console.error("Error fetching paginated orders: ", error)
		throw error
	}
}

export const getOrdersByCustomer = async (customerName: string) => {
	try {
		const q = query(collection(db, ORDERS_COLLECTION), where("customerName", "==", customerName), orderBy("createdAt", "desc"))
		const querySnapshot = await getDocs(q)
		return querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as Order[]
	} catch (error) {
		console.error("Error fetching orders: ", error)
		throw error
	}
}
