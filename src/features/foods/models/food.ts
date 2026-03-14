import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export const CATEGORIES = ["Tümü", "Çorba", "Ana Yemek", "Ara Sıcak", "Tatlı", "İçecek"]

export interface Food {
	id: string
	name: string
	price: number
	category: string
	description: string
	createdAt: any
}

export interface PaginatedFoods {
	foods: Food[]
	lastVisible: QueryDocumentSnapshot<DocumentData> | null
}

