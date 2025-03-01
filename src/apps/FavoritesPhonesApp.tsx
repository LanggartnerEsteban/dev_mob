import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../services/Store";
import { Phone } from "../models/Phone";
import PhoneCard from "../components/PhoneCard";

/**
 * Composant d'affichage de la page des favoris.
 */
export function FavoritesPhonesApp() {
	// Récupération des favoris.
	const favorites: Phone[] = useSelector(
		(state: IRootState) => state.favorites.phones
	);

	return (
		<View>
			{favorites?.length > 0 ? (
				favorites?.map((phone) => (
					<PhoneCard key={phone.id} phone={phone} />
				))
			) : (
				<Text>{`Vous n'avez aucun favoris`}</Text>
			)}
		</View>
	);
}
