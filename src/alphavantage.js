const fetch = require("node-fetch");
const AVError = require("./error");
const Big = require("big.js");

const baseUrl = "https://www.alphavantage.co/query";

module.exports = class AlphaVantage {

	constructor(useBig = true, apiKey = null) {
		if (!apiKey)
			apiKey = process.env.AV_KEY;

		if (!apiKey)
			throw new Error("Could not load API key");

		this.apiKey = apiKey;
		this.useBig = useBig;
	}

	async quote(symbol, useBig = this.useBig) {
		try {
			const res = await this.makeGet("GLOBAL_QUOTE", "symbol=" + symbol);

			return new Quote(res["Global Quote"], useBig);
		} catch (error) {

			if (error.message.includes("Invalid API call."))
				throw new AVError("Invalid symbol");

			throw error;
		}
	}
	async search(query) {
		try {

			if(!query || query === "")
				throw new AVError("Invalid query");

			const res = await this.makeGet("SYMBOL_SEARCH", "keywords=" + query);
			return res.bestMatches.map(match => new SearchResult(match));
		} catch (error) {
			if (error.message.includes("Invalid API call."))
				throw new AVError("Invalid query");
			throw error;
		}
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

}

class Quote {
	constructor(obj, useBig) {
		if (useBig) {
			this.symbol = obj["01. symbol"];
			this.open = new Big(obj["02. open"]);
			this.high = new Big(obj["03. high"]);
			this.low = new Big(obj["04. low"]);
			this.price = new Big(obj["05. price"]);
			this.volume = parseInt(obj["06. volume"]);
			this.latestTradingDay = new Date(obj["07. latest trading day"]);
			this.previousClose = new Big(obj["08. previous close"]);
			this.change = new Big(obj["09. change"]);
			this.changePercent = new Big(obj["10. change percent"].slice(0, -1));
		} else {
			this.symbol = obj["01. symbol"];
			this.open = obj["02. open"];
			this.high = obj["03. high"];
			this.low = obj["04. low"];
			this.price = obj["05. price"];
			this.volume = parseInt(obj["06. volume"]);
			this.latestTradingDay = new Date(obj["07. latest trading day"]);
			this.previousClose = obj["08. previous close"];
			this.change = obj["09. change"];
			this.changePercent = obj["10. change percent"].slice(0, -1);
		}
	}

}

class SearchResult {

	constructor(obj) {
		this.symbol = obj["1. symbol"];
		this.name = obj["2. name"];
		this.type = obj["3. type"];
		this.region = obj["4. region"];
		this.marketOpen = obj["5. marketOpen"];
		this.marketClose = obj["6. marketClose"];
		this.timezone = obj["7. timezone"];
		this.currency = obj["8. currency"];
		this.matchScore = parseFloat(obj["9. matchScore"]);
	}

}