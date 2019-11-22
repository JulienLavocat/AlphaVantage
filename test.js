const {Client, AVError} = require("./src");

require("dotenv").config();

const print = res => console.log(res);

const av = new Client(false);

av.search("FDJ.").then(print);

av.quote("FDJ.PAR").then(print);
