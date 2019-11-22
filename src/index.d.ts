import Big from "big.js";

declare namespace AlphaVantage {
	var Client: AVClient;
	var AVError: AVError;
}

interface AVClient {
	/**
	 * Construct a new AlphaVantage client
	 * @param {boolean} useBig tell the client if it should return raw numeric values or use Big.js for safe calculations (default: true)
	 * @param {string} apiKey specify the API Key, if not supplied the API key will be loaded from the AV_KEY environment variable
	 */
	new (useBig?: boolean, apiKey?: string): AVClient;

	/**
	 * Get the current market data of the requested symbol
	 * @param {string} symbol the symbol to fetch
	 * @param {boolean} useBig should Big.js be used for this request
	 */
	quote(symbol: string, useBig?: boolean): Promise<Quote>;

	/**
	 * Search for symbols
	 * @param {string} query Keywords to look for
	 */
	search(query: string): Promise<SearchResult[]>;
}

interface Quote {
	symbol: string;
	open: Big | string;
	high: Big | string;
	low: Big | string;
	price: Big | string;
	volume: number;
	latestTradingDay: Date;
	previousClose: Big | string;
	change: Big | string;
	changePercent: Big | string;
}

interface SearchResult {
	symbol: string;
	name: string;
	type: string;
	region: string;
	marketOpen: string;
	marketClose: string;
	timezone: string;
	currency: string;
	matchScore: number;
}

interface AVError {
	new (message: string): AVError;
}

export = AlphaVantage;
