import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AppBar, Surface } from "@react-native-material/core";
import { Phone } from "../models/Phone";

/**
 * Propriétés du composant d'affichage des informations d'un téléphone mis en vente.
 */
interface PhoneComponentProperties {
	// Le téléphone mis en vente à afficher.
	phone: Phone;
	// Indique que le téléphone mis en vente fait partie des téléphones favoris.
	isInFavorites?: boolean;
}

/**
 * Le composant d'affichage des informations d'un téléphone mis en vente.
 */
export default function PhoneComponent(
	props: Readonly<PhoneComponentProperties>
) {
	return (
		<View>
			<AppBar title={props.phone.model} />

			<Surface style={styles.surface}>
				<Text style={styles.title}>Information :</Text>
				<Text>Prix : {props.phone.price} €</Text>
				<Text>{`Système d'exploitation: ${props.phone.os}`}</Text>
				<Text>Marque : {props.phone.constructor}</Text>
				<Text>Année de sortie : {props.phone.releaseDate}</Text>
			</Surface>

			<Surface style={styles.surface}>
				<Text style={styles.title}>Vendeur : </Text>
				<View style={styles.inlineContainer}>
					<Image
						source={{
							uri: `${props.phone.salerAvatar}`,
						}}
						style={styles.poster}
					/>
					<View>
						<Text style={styles.salerName}>
							{props.phone.salerGender === "Female"
								? "Mme."
								: "M."}{" "}
							{props.phone.saler}
						</Text>
						<View style={styles.inlineContainer}>
							<Text>Pays : {props.phone.salerCountry}</Text>
							<Text>Ville : {props.phone.salerCity}</Text>
						</View>
						<Text>Tel. {props.phone.phone}</Text>
					</View>
				</View>
			</Surface>

			<Surface style={styles.surface}>
				<Text style={styles.title}>Description :</Text>
				<Text>{props.phone.description}</Text>
			</Surface>
		</View>
	);
}

// Définit le style à appliquer sur le composant d'affichage d'un téléphone.
const styles = StyleSheet.create({
	surface: {
		margin: 10,
		padding: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	inlineContainer: {
		flexDirection: "row",
		gap: 20,
		marginTop: 5,
	},
	salerName: {
		fontSize: 18,
	},
	poster: {
		width: 50,
		height: 50,
		borderWidth: 1.5,
		borderRadius: 50,
		borderColor: "green",
		alignSelf: "center",
	},
});
