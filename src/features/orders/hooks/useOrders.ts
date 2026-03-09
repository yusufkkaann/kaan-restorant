import { useState, useEffect, useCallback } from "react"
import { getOrders } from "../services/orderService"
import type { Order } from "../models/order"
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"

export const useOrders = (pageSize: number = 3) => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Pagination state
	const [page, setPage] = useState(1)
	const [cursors, setCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([null])
	const [hasMore, setHasMore] = useState(true)

	const fetchOrders = useCallback(
		async (pageNum: number, currentCursors: (QueryDocumentSnapshot<DocumentData> | null)[]) => {
			try {
				setLoading(true)
				const cursor = currentCursors[pageNum - 1]
				const result = await getOrders(pageSize, cursor)

				setOrders(result.orders)
				setHasMore(result.hasMore)

				if (pageNum === currentCursors.length) {
					setCursors(prev => [...prev, result.lastVisible])
				}

				setError(null)
			} catch (err) {
				setError("Siparişler yüklenirken bir hata oluştu.")
				console.error(err)
			} finally {
				setLoading(false)
			}
		},
		[pageSize],
	)

	const nextPage = () => {
		if (hasMore) {
			const nextP = page + 1
			setPage(nextP)
			fetchOrders(nextP, cursors)
		}
	}

	const prevPage = () => {
		if (page > 1) {
			const prevP = page - 1
			setPage(prevP)
			fetchOrders(prevP, cursors)
		}
	}

	useEffect(() => {
		fetchOrders(1, [null])
	}, [fetchOrders])

	return {
		orders,
		loading,
		error,
		page,
		hasMore,
		nextPage,
		prevPage,
		refreshOrders: () => fetchOrders(page, cursors),
	}
}
