class LocalStorage {
	private keyName: string;

	constructor(name: string) {
		this.keyName = name;
	}

	getItem() {
		const item = localStorage.getItem(this.keyName);
		if (item !== null) {
			return JSON.parse(item);
		}
		return null;
	}

	setItem(item: object) {
		localStorage.setItem(this.keyName, JSON.stringify(item));
	}

	removeItem() {
		localStorage.removeItem(this.keyName);
	}
}

export default LocalStorage;
