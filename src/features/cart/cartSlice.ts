import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Food } from "../foods/models/food"

export interface CartItem extends Food {
	quantity: number
}

interface CartState {
	items: CartItem[]
	isCartOpen: boolean
}

// LocalStorage'dan sepeti yükle
const savedCart = localStorage.getItem("cart")
const initialState: CartState = {
	items: savedCart ? JSON.parse(savedCart) : [],
	isCartOpen: false,
}

const saveToLocalStorage = (items: CartItem[]) => {
	localStorage.setItem("cart", JSON.stringify(items))
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Food>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id)
			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
			state.isCartOpen = true // Sepete ekleyince otomatik aç
			saveToLocalStorage(state.items)
		},
		setCartOpen: (state, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload)
			saveToLocalStorage(state.items)
		},
		incrementQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find(item => item.id === action.payload)
			if (item) {
				item.quantity += 1
				saveToLocalStorage(state.items)
			}
		},
		decrementQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find(item => item.id === action.payload)
			if (item && item.quantity > 1) {
				item.quantity -= 1
				saveToLocalStorage(state.items)
			}
		},
		clearCart: state => {
			state.items = []
			saveToLocalStorage(state.items)
		},
	},
})

export const { addToCart, setCartOpen, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
