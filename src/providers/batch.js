const AVError = require("../error");
const {BatchQuote} = require("../structures");

module.exports = class Batch {

	constructor(api, useBig) {
		this.api = api;
		this.useBig = useBig;
	}

	async quote(symbols, useBig = this.useBig) {
		try {
			const res = await this.api.makeGet("BATCH_STOCK_QUOTES", "symbols=" + symbols.join(","));

			const map = {};

			res["Stock Quotes"].map(q => new BatchQuote(q, useBig))
				.forEach(quote => map[quote.symbol] = quote);

			return map;

		} catch (error) {

			if (error.message.includes("Invalid API call."))
				throw new AVError("Invalid symbol");

			throw error;
		}
	}

};