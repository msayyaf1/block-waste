const WasteNetwork = artifacts.require('./WasteNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('WasteNetwork', ([deployer, poster , worker1, worker2, collector]) => {
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

  describe('posts', async () => {
    let result, postCount

    before(async () => {
      result = await wasteNetwork.createPost('This is the first test post', 'Thrissur - test location 1', { from: poster }) //poster is the person who posted that post
      postCount = await wasteNetwork.postCount()
    })

    it('creates posts', async () => {
      // SUCCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is the first test post', 'content is correct')
      assert.equal(event.location, '0', 'tip amount is correct')
      assert.equal(event.poster, poster, 'poster is correct')

      // FAILURE: Post must have content
      await socialNetwork.createPost('', { from: author }).should.be.rejected;
    })


})