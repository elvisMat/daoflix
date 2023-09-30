require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments
    const timeLock = await get("TimeLock")

    const movieDao = await deploy("MovieDao", {
        from: wallet.address,
        args: [],
        log: true,
    })

    //Transfer Ownership to TimeLock.sol
    //Comment this out after deploying the first time
    console.log("Transferring MovieDao Owner to TimeLock.sol")
    const movieDaoContract = await ethers.getContractAt("MovieDao", movieDao.address)
    const transferOwnerTx = await movieDaoContract.transferOwnership(timeLock.address)
    await transferOwnerTx.wait()
    console.log("Ownership transferred")
}
