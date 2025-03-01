import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { IRootState } from "../services/Store";
import { Phone } from "../models/Phone";
import PhoneCard from "../components/PhoneCard";
import LottieView from "lottie-react-native";

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
			<LottieView source={require("../../assets/favoritesAnimate.json")} autoPlay loop style={styles.animation}/>
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

// Définition du style de la page.
const styles = StyleSheet.create({
	animation: {
		width: 100,
		height: 100,
		resizeMode: "stretch",
		alignSelf: "center"
	}
});