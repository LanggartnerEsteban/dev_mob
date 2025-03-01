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
