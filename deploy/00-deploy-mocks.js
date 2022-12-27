const { network } = require("hardhat")
const BASE_FEE = "250000000000000000" // 0.25 is this the premium in LINK?

//const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 is the premium
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (chainId == 31337) {
        log("Local neteork detected!! Deploying mocks...")
        //deploy a mock vrfCoordinator
        // it takes uint96 _baseFee, uint96 _gasPriceLink
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!")
        log("----------------------------------------------------------")
        log("You are deploying to a local network, you'll need a local network running to interact")
        log(
            "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
        )
        log("----------------------------------------------------------")
    }
}

module.exports.tags = ["all", "Mocks"]
