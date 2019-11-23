module.exports = class SearchResult {

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

};