import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { PhonesListApp } from "../apps/PhonesListApp";
import { PhoneApp } from "../apps/PhoneApp";
import { FavoritesPhonesApp } from "../apps/FavoritesPhonesApp";

// Définit les types de toutes les routes possibles.
export type RouteTypeList = {
	PhonesList: undefined;
	Phone: { phoneId: string };
	Favorites: undefined;
};

/**
 * Définition de toutes les routes possibles.
 */
export enum RouteNames {
	PhonesList = "PhonesList",
	Phone = "Phone",
	Favorites = "Favorites",
}

/**
 * Ajout des routes et des composants associés à l'application.
 */
export default function Routes() {
	const Stack = createNativeStackNavigator<RouteTypeList>();

	return (
		<Provider store={Store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={RouteNames.PhonesList}>
					<Stack.Screen
						name={RouteNames.PhonesList}
						component={PhonesListApp}
						options={{ title: "Liste des annonces" }}
					/>
					<Stack.Screen
						name={RouteNames.Phone}
						component={PhoneApp}
						options={{ title: "Annonce" }}
					/>
					<Stack.Screen
						name={RouteNames.Favorites}
						component={FavoritesPhonesApp}
						options={{ title: "Mes favoris" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
