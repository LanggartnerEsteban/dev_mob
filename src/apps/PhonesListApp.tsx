import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Chip, TextInput } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { IRootState } from "../services/Store";
import { PhonesList } from "../models/PhoneList";
import PhoneCard from "../components/PhoneCard";
import { Phone } from "../models/Phone";
import { RouteNames, RouteTypeList } from "../services/Routes";

/**
 * Description de l'état du composant de la liste des annonces à afficher.
 */
interface PhonesListState {
	// L'input de recherche saisie pour un modèle.
	model_search: string;

	// L'input de recherche saisie pour un vendeur.
	customer_search: string;

	// Indique que l'on trie les annonces par prix. Null si aucun tri.
	orderByPriceAsc: boolean | null;

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
		model_search: "",
		customer_search: "",
		orderByPriceAsc: null,
		phones: PhonesList.getInstance().getPhones(),
	});

	/**
	 * Méthode lancée à la modification du champs de recherche.
	 * @param text - Le texte saisi.
	 */
	function handleModelTextChange(text: string) {
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
		setState(
			Object.assign({}, state, { model_search: text, phones: newPhones })
		);
	}

	/**
	 * Méthode lancée à la modification du champs de recherche.
	 * @param text - Le texte saisi.
	 */
	function handleCustomerTextChange(text: string) {
		// On recherche les téléphones comportant ce nom de modèle.
		const newPhones = PhonesList.getInstance()
			.getPhones()
			.filter((phone) => {
				return phone.saler
					.trim()
					.toLowerCase()
					.includes(text.trim().toLowerCase());
			});

		// On met à jour notre état suivant ces informations.
		setState(
			Object.assign({}, state, {
				customer_search: text,
				phones: newPhones,
			})
		);
	}

	/**
	 * Méthode lancée au clic sur un bouton de tri.
	 * @param option - L'option de tri choisi.
	 */
	function handleOrderByPrice(option: boolean) {
		const phones = state.phones.sort((a, b) => {
			return a.price < b.price
				? option === true
					? -1
					: 1
				: option === true
					? 1
					: -1;
		});

		setState(
			Object.assign({}, state, {
				orderByPriceAsc: option,
				phones: phones,
			})
		);
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

			<View>
				<TextInput
					label="Rechercher par modèle"
					value={state.model_search}
					onChangeText={(text) => handleModelTextChange(text)}
					style={styles.input}
				/>
				<TextInput
					label="Rechercher par constructeur"
					value={state.customer_search}
					onChangeText={(text) => handleCustomerTextChange(text)}
					style={styles.input}
				/>
				<View style={styles.chipContainer}>
					<Chip
						label={"Prix croissant"}
						variant={
							state.orderByPriceAsc === true
								? "filled"
								: "outlined"
						}
						style={state.orderByPriceAsc === true && styles.selectedChip}
						onPress={() => handleOrderByPrice(true)}
					/>
					<Chip
						label={"Prix décroissant"}
						variant={
							state.orderByPriceAsc === false
								? "filled"
								: "outlined"
						}
						style={state.orderByPriceAsc === false && styles.selectedChip}
						onPress={() => handleOrderByPrice(false)}
					/>
				</View>
			</View>

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
	chipContainer: {
		flexDirection: "row",
		gap: "2%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
	},
	selectedChip: {
		backgroundColor: "turquoise"
	}
});
