// Need to apply `brfs` transform to bundle this for browser
var fs = require("fs");
var Web3 = require("web3");
var web3 = new Web3();
var dappsys = require("./dapple_packages/dappsys/build/js_module.js");
var objects = JSON.parse(fs.readFileSync("./env/objects.json"));

module.exports = (function() {
    this.web3 = web3;
    this.objects = objects;
    this.header = dappsys; // TODO merge other dependencies
    for( var key of Object.keys(objects) ) {
        var classname = this.objects[key].typename;
        var abi = JSON.parse(this.header[classname]["interface"]);
        var contract = web3.eth.contract(abi);
        var address = this.objects[key].address;
        var instance = contract.at(address);
        this.objects[key].instance = instance
        console.log("Instantiated object " + key + " with classname " + classname);
    }
})();
