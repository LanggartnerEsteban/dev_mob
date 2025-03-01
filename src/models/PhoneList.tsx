import { Phone } from "./Phone";

/**
 * Classe de conservation des informations sur la liste des téléphones vendus.
 */
export class PhonesList {
	// Le singleton de cette classe.
	private static phonesListInstance: PhonesList | null = null;

	// La liste des téléphones vendus possibles.
	protected phones: Phone[];

	constructor() {
		// On initialise notre liste des téléphones vendus à partir des fichiers json.
		this.phones = require("../../assets/phone.json");
	}

	// Récupère l'instance de notre singleton.
	public static getInstance(): PhonesList {
		if (PhonesList.phonesListInstance == null) {
			PhonesList.phonesListInstance = new PhonesList();
		}
		return PhonesList.phonesListInstance;
	}

	// Récupère la liste des téléphones vendus de l'application.
	public getPhones(): Phone[] {
		return this.phones;
	}
}
