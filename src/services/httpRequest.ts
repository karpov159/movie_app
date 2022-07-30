const httpRequest = async (url: string) => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('error');
		}
		const data = await response.json();

		return data;
	} catch (e) {
		throw e;
	}
};

export default httpRequest;
