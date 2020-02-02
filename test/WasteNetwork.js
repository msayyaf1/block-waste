const WasteNetwork = artifacts.require('./WasteNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('WasteNetwork', ([deployer, poster, worker, collector]) => {
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
      result = await wasteNetwork.createPost('This is the first test post', { from: poster }) //poster is the person who posted that post
      postCount = await wasteNetwork.postCount()
    })

    it('creates posts', async () => {
      // SUCCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is the first test post', 'content is correct')
      assert.equal(event.poster, poster, 'the posted person is correct')
      assert.equal(event.worker, 0x0000000000000000000000000000000000000000,'Worker ADDRESS TEST')
      assert.equal(event.payamt, '0', 'pay amount is correct')
      // FAILURE: Post must have content
      await wasteNetwork.createPost('', { from: poster }).should.be.rejected;
    })

    it('lists posts', async () => {
      const post = await wasteNetwork.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.content, 'This is the first test post', 'content is correct')
      assert.equal(post.poster, poster, 'the posted person is correct')
      assert.equal(post.worker, 0x0000000000000000000000000000000000000000,'Worker ADDRESS TEST')
      
    })

    it('Allow workers to claim the posts' , async() => {
      //getting the current user
      // const accounts = await web3.eth.getAccounts()
      // const currentuser = accounts[0] 

      result = await wasteNetwork.ClaimPost(postCount, { from: worker })

      //SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is the first test post', 'content is correct')
      assert.equal(event.poster, poster, 'the posted person is correct')
      assert.equal(event.worker, 0x0000000000000000000000000000000000000000,'Worker ADDRESS TEST')
       
    })






    it('Transferring rewards to workers' , async () => {
      //Track  old worker balance before reward
      let oldWorkerBalance
      oldWorkerBalance = await web3.eth.getBalance(worker)
      oldWorkerBalance = new web3.utils.BN(oldWorkerBalance)

      result = await wasteNetwork.payCollection(postCount, { from: collector, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is the first test post', 'content is correct')
      assert.equal(event.poster, poster, 'the posted person is correct')
      assert.equal(event.payamt, '1000000000000000000', 'tip amount is correct')
      
      // Check that worker received funds
      let newWorkerBalance
      newWorkerBalance = await web3.eth.getBalance(worker)
      newWorkerBalance = new web3.utils.BN(newWorkerBalance)

      let payamt
      payamt = web3.utils.toWei('1', 'Ether')
      payamt = new web3.utils.BN(payamt)

      const expectBalance = oldWorkerBalance.add(payamt)

      assert.equal(newWorkerBalance.toString(), expectBalance.toString())








    })
    

    

  })
}) 
