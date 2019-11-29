var ElectionContract = artifacts.require("../contracts/Election.sol");

module.exports = function(deployer) {
  deployer.deploy(ElectionContract);
};
