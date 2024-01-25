import pkg from 'hardhat';
const { ethers } = pkg;

describe("PACCAT", function () {
    let accounts
    let PACCATContract

    const MaxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    before(async function () { 
        accounts = await ethers.getSigners()
        PACCATContract = (await ethers.getContractFactory("PACCAT")).attach('0x90C0bc0bd5b6aE97D700e4c33C7fDc0Fc6e04e7B')
    })

    it("claimTest, 테스트", async function(){   
        await PACCATContract.claimTest(accounts[0].address, ethers.utils.parseEther('10'))
    })


})
