const fetch = require("node-fetch");
const AVError = require("./error");

const baseUrl = "https://www.alphavantage.co/query";

module.exports = class API {

	constructor(apiKey) {
		this.apiKey = apiKey;
	}

	async makeGet(queryFunc, args) {
		try {
			const res = await fetch(`${baseUrl}?function=${queryFunc}&${args}&apikey=${this.apiKey}`)
				.then(res => res.json())
				.then(this.checkApiError);

			return res;
		} catch (error) {
			throw new AVError(error.message);
		}
	}
	makePost() {

	}

	checkApiError(json) {
		const message = json["Error Message"];

		if (message) {
			if (message.includes("the parameter apikey is invalid"))
				throw new Error("Invalid API Key");

			throw new Error(json["Error Message"]);
		}
		return json;
	}
};