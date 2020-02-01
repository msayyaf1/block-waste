const WasteNetwork = artifacts.require('./WasteNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('WasteNetwork', () => {
  let wasteNetwork
  
  before(async () => {
    wasteNetwork = await WasteNetwork.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await wasteNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await wasteNetwork.name()
      assert.equal(name, 'Waste Manager Network')
    })
  })






})