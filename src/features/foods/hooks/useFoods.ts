import { useState, useEffect, useCallback } from "react"
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import type { Food } from "../models/food"
import * as foodService from "../services/foodService"

export const useFoods = (pageSize: number = 3) => {
	const [foods, setFoods] = useState<Food[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Filtering state
	const [category, setCategory] = useState<string>("Tümü")
	const [searchTerm, setSearchTerm] = useState<string>("")

	// Pagination state
	const [page, setPage] = useState(1)
	const [cursors, setCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([null])
	const [hasMore, setHasMore] = useState(true)

	const fetchFoods = useCallback(
		async (pageNum: number, currentCursors: (QueryDocumentSnapshot<DocumentData> | null)[] = [null], cat: string = category, search: string = searchTerm) => {
			try {
				setLoading(true)
				const cursor = currentCursors[pageNum - 1]
				const result = await foodService.getFoods(pageSize, cursor, cat, search)

				setFoods(result.foods)
				setHasMore(result.hasMore)

				if (pageNum === currentCursors.length) {
					setCursors(prev => [...prev, result.lastVisible])
				}

				setError(null)
			} catch (err) {
				setError("Yemekler yüklenirken bir hata oluştu.")
				console.error(err)
			} finally {
				setLoading(false)
			}
		},
		[pageSize, category, searchTerm],
	)

	const nextPage = () => {
		if (hasMore) {
			const nextP = page + 1
			setPage(nextP)
			fetchFoods(nextP, cursors)
		}
	}

	const prevPage = () => {
		if (page > 1) {
			const prevP = page - 1
			setPage(prevP)
			fetchFoods(prevP, cursors)
		}
	}

	// Reset pagination when filters change
	useEffect(() => {
		const handler = setTimeout(() => {
			setPage(1)
			setCursors([null])
			fetchFoods(1, [null], category, searchTerm)
		}, 300) // Debounce search

		return () => clearTimeout(handler)
	}, [category, searchTerm, fetchFoods])

	const addFood = async (food: Omit<Food, "id" | "createdAt">) => {
		try {
			await foodService.createFood(food)
			setPage(1)
			setCursors([null])
			await fetchFoods(1, [null], category, searchTerm)
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	const updateFood = async (id: string, data: Partial<Omit<Food, "id">>) => {
		try {
			await foodService.editFood(id, data)
			await fetchFoods(page, cursors, category, searchTerm)
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	const deleteFood = async (id: string) => {
		try {
			await foodService.removeFood(id)
			if (foods.length === 1 && page > 1) {
				prevPage()
			} else {
				await fetchFoods(page, cursors, category, searchTerm)
			}
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	return {
		foods,
		loading,
		error,
		page,
		hasMore,
		category,
		searchTerm,
		setCategory,
		setSearchTerm,
		nextPage,
		prevPage,
		addFood,
		updateFood,
		deleteFood,
		refresh: () => fetchFoods(page, cursors, category, searchTerm),
	}
}
