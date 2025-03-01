import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, StyleSheet } from "react-native";
import { RouteNames, RouteTypeList } from "../services/Routes";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, TextInput } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { IRootState } from "../services/Store";
import { PhonesList } from "../models/PhoneList";
import PhoneCard from "../components/PhoneCard";
import { Phone } from "../models/Phone";

/**
 * Description de l'état du composant de la liste des annonces à afficher.
 */
interface PhonesListState {
	// L'input de recherche saisie par l'utilisateur.
	search: string;
	// Les numéros de téléphones à afficher.
	phones: Phone[];
}

/**
 * Composant d'affichage de la liste des films à afficher.
 */
export function PhonesListApp() {
	// Permet la navigation entre les pages.
	const navigation =
		useNavigation<NativeStackNavigationProp<RouteTypeList>>();

	// Récupération des favoris.
	const favoritesCount: number = useSelector(
		(state: IRootState) => state.favorites.phones.length
	);

	// Définition de l'état du composant.
	const [state, setState] = useState<PhonesListState>({
		search: "",
		phones: PhonesList.getInstance().getPhones(),
	});

	/**
	 * Méthode lancée à la modification du champs de recherche.
	 * @param text - Le texte saisi.
	 */
	function handleTextChange(text: string) {
		// On recherche les téléphones comportant ce nom de modèle.
		const newPhones = PhonesList.getInstance()
			.getPhones()
			.filter((phone) => {
				return phone.model
					.trim()
					.toLowerCase()
					.includes(text.trim().toLowerCase());
			});

		// On met à jour notre état suivant ces informations.
		setState({ search: text, phones: newPhones });
	}

	return (
		<ScrollView>
			<Button
				title={`Mes favoris : ${favoritesCount}`}
				style={styles.button}
				uppercase={false}
				color="green"
				onPress={() => navigation.navigate(RouteNames.Favorites)}
			/>

			<TextInput
				label="Rechercher par modèle"
				value={state.search}
				onChangeText={(text) => handleTextChange(text)}
				style={styles.input}
			/>

			<Text
				style={styles.phonesCount}
			>{`Nombre d'annonce : ${state.phones.length}`}</Text>

			{state.phones ? ( // Si la liste des téléphones existe.
				state.phones.map((phone) => (
					// On affiche chacun des téléphones de la liste.
					<PhoneCard key={phone.id} phone={phone} />
				))
			) : (
				// Sinon, on affiche que l'on est en train de chercher les téléphones.
				<Text>Chargement...</Text>
			)}
		</ScrollView>
	);
}

// Définition du style de la page.
const styles = StyleSheet.create({
	button: {
		width: 200,
		alignSelf: "center",
		marginTop: 20,
		marginBottom: 10,
	},
	input: {
		width: "90%",
		alignSelf: "center",
	},
	phonesCount: {
		fontStyle: "italic",
		fontSize: 12,
		margin: 10,
	},
});
