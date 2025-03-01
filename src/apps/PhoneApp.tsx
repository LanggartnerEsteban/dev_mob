import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../services/Store";
import { RouteProp } from "@react-navigation/native";
import { Phone } from "../models/Phone";
import { PhonesList } from "../models/PhoneList";
import PhoneComponent from "../components/PhoneComponent";
import { addPhone, delPhone } from "../services/FavoritesSlice";
import { RouteTypeList } from "../models/Routing";

/**
 * Définition des propriétés de la page d'un téléphone.
 */
interface PhoneAppProperties {
	// Les paramètres reçus pour cette page.
	route: RouteProp<RouteTypeList, "Phone">;
}

/**
 * Définition des informations d'état du composant d'affichage d'un téléphone.
 */
interface PhoneAppState {
	// Le téléphone que l'on doit afficher.
	phone: Phone;

	// Indique que le téléphone fait partie des favoris.
	isFavorite: boolean;
}

/**
 * Composant d'affichage des informations complètes pour un film.
 */
export function PhoneApp(props: Readonly<PhoneAppProperties>) {
	// Les informations de l'état du composant
	const [state, setState] = useState<PhoneAppState>({
		phone: {} as Phone,
		isFavorite: false,
	});

	// Permet la connexion avec le store.
	const dispatch = useDispatch();

	// Récupération des favoris stocké dans le store.
	const favorites: Phone[] = useSelector(
		(state: IRootState) => state.favorites.phones
	);

	// Méthode lancée à l'initialisation du composant.
	useEffect(() => {
		// On récupère l'id du téléphone à afficher passé en paramètre.
		const id = props.route.params.phoneId;

		// On sauvegarde dans notre état le téléphone qui correspond à l'identifiant passé en paramètre.
		setState(
			Object.assign({}, state, {
				phone: PhonesList.getInstance()
					.getPhones()
					.find((phone) => phone.id === id),
			})
		);
	}, []);

	// Méthode lancée à l'initialisation du téléphone et à la modification des favoris.
	useEffect(() => {
		// On vérifie la présence de ce téléphone dans les favoris.
		setState(
			Object.assign({}, state, {
				isFavorite:
					favorites.find(
						(favorite) => favorite.id === state.phone?.id
					) != null,
			})
		);
	}, [favorites, state.phone]);

	return (
		<View>
			{state?.phone && ( // Si on a récupéré le téléphone, on affiche les informations.
				<PhoneComponent phone={state.phone} />
			)}
			<Button
				title={
					state.isFavorite
						? "Supprimer des favoris"
						: "Ajouter au favoris"
				}
				style={styles.button}
				color={state.isFavorite ? "red" : "green"}
				onPress={() =>
					dispatch(
						state.isFavorite
							? delPhone(state.phone)
							: addPhone(state.phone)
					)
				}
			/>
		</View>
	);
}

// Définition du style de la page.
const styles = StyleSheet.create({
	button: {
		width: 300,
		alignSelf: "center",
		margin: 10,
	},
});
