const { assert, expect } = require('chai');
const chaiBignumber = require('chai-bignumber');

const Token = artifacts.require('ERC20Token');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'Ether');
}

contract('Token generator', ([owner, investor]) => {
  let token;

  before(async () => {
    token = await Token.new("Ridnois utility token", "RID", tokens('1000000'), '18');
  });

  describe('tokens', async () => {
    it('should be of type string', async () => {
      let t = tokens('1');
      assert.equal(typeof t, 'string');
    })
  });

  describe("RID token", async () => {
    it("Has a name", async () => {
      let name = await token.name();
      assert.equal(name, "Ridnois utility token");
    });

    it('Should be able to transfer', async () => {
      await token.transfer(investor, tokens('10'));
      let result = await token.balanceOf(investor);
      assert.equal(result.toString(), tokens('10'));
    });
  })
});