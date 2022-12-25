const developementChains = require("../helper-hardhat-config")
const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 is the premium
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developementChains.includes(network.name)) {
        log("Local neteork detected!! Deploying mocks...")
        //deploy a mock vrfCoordinator
        // it takes uint96 _baseFee, uint96 _gasPriceLink
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mock deployed!")
        log("-----------------------------------")
    }
}

module.exports.tags = [all, Mocks]
