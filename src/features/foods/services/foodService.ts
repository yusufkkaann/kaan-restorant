import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, limit, startAfter, where } from "firebase/firestore"
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { db } from "../../../firebase/config"
import type { Food, PaginatedFoods } from "../models/food"

const COLLECTION_NAME = "foods"

export const getFoods = async (pageSize: number = 3, lastDoc?: QueryDocumentSnapshot<DocumentData> | null, category?: string, searchTerm?: string): Promise<PaginatedFoods & { hasMore: boolean }> => {
	let q = query(collection(db, COLLECTION_NAME))

	if (category && category !== "Tümü") {
		q = query(q, where("category", "==", category))
	}

	if (searchTerm) {
		// Firestore doesn't support full-text search, but "starts with" can be done with range query
		// Note: This requires the field to be the first in orderBy
		const searchLower = searchTerm.toLowerCase()
		q = query(q, where("name_lower", ">=", searchLower), where("name_lower", "<=", searchLower + "\uf8ff"), orderBy("name_lower"))
	} else {
		q = query(q, orderBy("createdAt", "desc"))
	}

	q = query(q, limit(pageSize + 1))

	if (lastDoc) {
		q = query(q, startAfter(lastDoc))
	}

	const querySnapshot = await getDocs(q)
	const allDocs = querySnapshot.docs
	const hasMore = allDocs.length > pageSize
	const pagedDocs = hasMore ? allDocs.slice(0, pageSize) : allDocs

	const foods = pagedDocs.map(
		doc =>
			({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
			}) as Food,
	)

	return {
		foods,
		lastVisible: pagedDocs[pagedDocs.length - 1] || null,
		hasMore,
	}
}

export const createFood = async (food: Omit<Food, "id" | "createdAt">): Promise<string> => {
	const docRef = await addDoc(collection(db, COLLECTION_NAME), {
		...food,
		name_lower: food.name.toLowerCase(),
		createdAt: serverTimestamp(),
	})
	return docRef.id
}

export const editFood = async (id: string, data: Partial<Omit<Food, "id">>): Promise<void> => {
	const foodDoc = doc(db, COLLECTION_NAME, id)
	const updateData: any = { ...data }
	if (data.name) {
		updateData.name_lower = data.name.toLowerCase()
	}
	await updateDoc(foodDoc, updateData)
}

export const removeFood = async (id: string): Promise<void> => {
	const foodDoc = doc(db, COLLECTION_NAME, id)
	await deleteDoc(foodDoc)
}
