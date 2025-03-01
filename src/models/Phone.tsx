/**
 * Définition des proprités d'un téléphone mis en vente.
 */
export interface Phone {
	id: string;
	model: string;
	constructor: string;
	os: string;
	releaseDate: number;
	salerAvatar: string;
	saler: string;
	description: string;
	salerGender: string;
	salerCity: string;
	salerCountry: string;
	phone: string;
	price: number;
}
