const Big = require("big.js");

module.exports = class BatchQuote {
	constructor(obj, useBig) {

		this.symbol = obj["1. symbol"];
		useBig ? this.price = new Big(obj["2. price"]) : this.price = obj["2. price"];
		this.volume = parseInt(obj["3. volume"]);
		this.timestamp = new Date(obj["4. timestamp"]);
	}

};