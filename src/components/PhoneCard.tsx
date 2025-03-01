import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Surface } from "@react-native-material/core";
import { RouteNames, RouteTypeList } from "../services/Routes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Phone } from "../models/Phone";

/**
 * Propriétés du composant d'affichage d'une carte munie des informations d'un téléphone mis en vente.
 */
interface PhoneCardProperties {
	// Le téléphone mis en vente à afficher.
	phone: Phone;
	// Indique que le téléphone mis en vente fait partie des téléphones favoris.
	isInFavorites?: boolean;
}

/**
 * Le composant d'affichage des informations d'un téléphone mis en vente.
 */
export default function PhoneCard(props: Readonly<PhoneCardProperties>) {
	// Permet la navigation entre les pages.
	const navigation =
		useNavigation<NativeStackNavigationProp<RouteTypeList>>();

	return (
		<Surface elevation={4} style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => {
					// Au clic, on renvoi sur la page du téléphone.
					navigation.navigate(RouteNames.Phone, {
						phoneId: props.phone.id,
					} as never);
				}}
			>
				<Text style={styles.title}>{props.phone.model}</Text>

				<Text>{`${props.phone.releaseDate} - ${props.phone.price} €`}</Text>

				<Text>{props.phone.description}</Text>
			</TouchableOpacity>
		</Surface>
	);
}

// Définit le style à appliquer sur le composant d'affichage d'une carte de téléphone.
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 5,
		padding: 10,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	poster: {
		width: 200,
		height: 300,
		alignSelf: "center",
		marginBottom: 5,
	},
	release_date: {
		fontStyle: "italic",
	},
	labelContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 5,
		gap: 5,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		textDecorationLine: "underline",
	},
});
