const {Client} = require("./src");

require("dotenv").config();

const print = res => console.log(res);

const av = new Client(false);

// av.search("FDJ.").then(print);
// av.quote("FDJ.PAR").then(print);
// av.quote("FDJ.PAR", true).then(result => console.log(result.price.toFixed(4)));
av.batch.quote(["AAPL", "FB"], true).then(print);