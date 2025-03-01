import { createSlice } from "@reduxjs/toolkit";
import { Phone } from "../models/Phone";

// Construction de la gestion des favoris.
export const favoritesSlice = createSlice({
	name: "favorites",
	initialState: {
		phones: [] as Phone[], // La liste des téléphones favoris.
	},
	reducers: {
		// Méthode d'ajout d'un téléphone à la liste des favoris.
		addPhone: (state, action) => {
			state.phones.push(action.payload);
		},

		// Méthode de suppression d'un téléphone à la liste des favoris.
		delPhone: (state, action) => {
			state.phones = state.phones.filter(
				(phone) => phone.id != action.payload.id
			);
		},
	},
});

// Exportation des méthodes associées aux favoris.
export const { addPhone, delPhone } = favoritesSlice.actions;
