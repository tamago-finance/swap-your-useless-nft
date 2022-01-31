const { LUCKBOX } = require("../constants")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("TrashYourNFT", {
    from: deployer,
    args: [LUCKBOX, deployer],
    log: true,
  })

  console.log("✅ Done 🦄")
}
module.exports.tags = ["TrashYourNFT"]
