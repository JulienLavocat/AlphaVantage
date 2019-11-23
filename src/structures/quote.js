const Big = require("big.js");

module.exports = class Quote {
	constructor(obj, useBig) {

		this.symbol = obj["01. symbol"];
		this.volume = parseInt(obj["06. volume"]);

		if (useBig) {
			this.open = new Big(obj["02. open"]);
			this.high = new Big(obj["03. high"]);
			this.low = new Big(obj["04. low"]);
			this.price = new Big(obj["05. price"]);
			this.latestTradingDay = new Date(obj["07. latest trading day"]);
			this.previousClose = new Big(obj["08. previous close"]);
			this.change = new Big(obj["09. change"]);
			this.changePercent = new Big(obj["10. change percent"].slice(0, -1));
		} else {
			this.open = obj["02. open"];
			this.high = obj["03. high"];
			this.low = obj["04. low"];
			this.price = obj["05. price"];
			this.latestTradingDay = new Date(obj["07. latest trading day"]);
			this.previousClose = obj["08. previous close"];
			this.change = obj["09. change"];
			this.changePercent = obj["10. change percent"].slice(0, -1);
		}
	}

};