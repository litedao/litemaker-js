var fs = require("fs");
var Web3 = require("web3");
var web3 = new Web3();
var dappsys = require("./dapple_packages/dappsys/build/js_module.js");
var objects = JSON.parse(fs.readFileSync("./env/objects.json"));

var Maker = function() {
    // Need to apply `brfs` transform to bundle this for browser

    this.web3 = web3;
    this.objects = objects;
    this.header = dappsys; // TODO merge other dependencies
    this.symbol_to_db_name = {
        "MKR": "mkr_db",
        "DAI": "dai_db"
    }
    for( var key of Object.keys(objects) ) {
        var classname = this.objects[key].typename;
        var abi = JSON.parse(this.header[classname]["interface"]);
        var contract = this.web3.eth.contract(abi);
        var address = this.objects[key].address;
        var instance = contract.at(address);
        this.objects[key].instance = instance
    }

    this.getSupply = function(symbol, cb) {
        var objectname = this.symbol_to_db_name[symbol];
        var baldb = this.objects[objectname].instance;
        baldb.get_supply(function(err, res) {
            if (err) { cb(err, null); }
            if (!res[1]) { cb(res[1], null); }
            var wei_supply = res[0].toNumber();
            var supply = wei_supply / Math.pow(10, 18);
            cb(null, supply);
        });
    }

    this.getBalance = function(symbol, addr) {
        var objectname = this.symbol_to_db_name[symbol];
        var baldb = this.objects[objectname].instance;
        baldb.get_balance(function(err, res) {
            if (err) { cb(err, null); }
            if (!res[1]) { cb(res[1], null); }
            var wei_balance = res[0].toNumber();
            var balance = wei_balance / Math.pow(10, 18);
            cb(null, balance);
        });
    }
};
var maker = new Maker();
module.exports.maker = maker;
window.maker = maker;
