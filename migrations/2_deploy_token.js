const ERC20Token = artifacts.require('ERC20Token');

module.exports = async function (deployer, net, accounts) {

  deployer.deploy(ERC20Token, 'Ridnois sample Token', 'RID', '1000000000000000000000000', '18');
}