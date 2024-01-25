async function main() {
    const accounts = await ethers.getSigners();  

    const PACCATContract = await (await ethers.getContractFactory("PACCAT")).deploy(
      accounts[0].address,
      accounts[0].address,
      168587773
    )
    await PACCATContract.deployed();
    console.log("PACCATContract: " + PACCATContract.address)

  }
  
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });