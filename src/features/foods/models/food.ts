import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

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
