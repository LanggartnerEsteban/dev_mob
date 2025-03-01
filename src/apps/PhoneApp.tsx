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
import { RouteTypeList } from "../services/Routes";

/**
 * Définition des propriétés de la page d'un téléphone.
 */
interface PhoneAppProperties {
	// Les paramètres reçus pour cette page.
	route: RouteProp<RouteTypeList, "Phone">;
}

/**
 * Composant d'affichage des informations complètes pour un film.
 */
export function PhoneApp(props: Readonly<PhoneAppProperties>) {
	// Indique que le téléphone fait partie des favoris.
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	// Le téléphone à afficher.
	const [phone, setPhone] = useState<Phone|undefined>(undefined);

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
		setPhone(PhonesList.getInstance()
			.getPhones()
			.find((phone) => phone.id === id)
		);
	}, []);

	// Méthode lancée à l'initialisation du téléphone et à la modification des favoris.
	useEffect(() => {
		// On vérifie la présence de ce téléphone dans les favoris.
		setIsFavorite(
			favorites.find(
				(favorite) => favorite.id === phone?.id
			) != null,
		)
	}, [favorites, phone]);

	return (
		<View>
			{phone && ( // Si on a récupéré le téléphone, on affiche les informations.
				<PhoneComponent phone={phone} />
			)}
			<Button
				title={
					isFavorite
						? "Supprimer des favoris"
						: "Ajouter au favoris"
				}
				style={styles.button}
				color={isFavorite ? "red" : "green"}
				onPress={() =>
					dispatch(
						isFavorite
							? delPhone(phone)
							: addPhone(phone)
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
