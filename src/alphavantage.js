const AVError = require("./error");
const {Quote, SearchResult} = require("./structures");
const API = require("./api");
const Batch = require("./providers/batch");

module.exports = class AlphaVantage {

	constructor(useBig = true, apiKey = null) {
		if (!apiKey)
			apiKey = process.env.AV_KEY;

		if (!apiKey)
			throw new Error("Could not load API key");

		this.apiKey = apiKey;
		this.useBig = useBig;

		this.api = new API(this.apiKey);

		this.batch = new Batch(this.api);
	}

	async quote(symbol, useBig = this.useBig) {
		try {
			const res = await this.api.makeGet("GLOBAL_QUOTE", "symbol=" + symbol);

			return new Quote(res["Global Quote"], useBig);
		} catch (error) {

			if (error.message.includes("Invalid API call."))
				throw new AVError("Invalid symbol");

			throw error;
		}
	}
	async search(query) {
		try {

			if (!query || query === "")
				throw new AVError("Invalid query");

			const res = await this.api.makeGet("SYMBOL_SEARCH", "keywords=" + query);
			return res.bestMatches.map(match => new SearchResult(match));
		} catch (error) {
			if (error.message.includes("Invalid API call."))
				throw new AVError("Invalid query");
			throw error;
		}
	}

};