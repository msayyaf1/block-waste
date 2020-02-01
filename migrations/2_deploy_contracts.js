const WasteNetwork = artifacts.require("WasteNetwork");

module.exports = function(deployer) {
  deployer.deploy(WasteNetwork);
};
