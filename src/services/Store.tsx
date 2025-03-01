import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./FavoritesSlice";

// Configuration du store global.
export const Store = configureStore({
	reducer: {
		favorites: favoritesSlice.reducer,
	},
});

// On exporte aussi le type de l'état d'un slice.
export type IRootState = ReturnType<typeof Store.getState>;
