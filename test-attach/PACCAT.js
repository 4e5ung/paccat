import pkg from 'hardhat';
const { ethers } = pkg;

describe("PACCAT", function () {
    let accounts
    let PACCATContract

    const MaxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    before(async function () { 
        accounts = await ethers.getSigners()
        PACCATContract = (await ethers.getContractFactory("PacCat")).attach('0xc8cAC523279B31e54949A6deA0462624ED69E164')
    })

    it("claimTest, 테스트", async function(){   
        // await PACCATContract.claimTest(accounts[0].address, ethers.utils.parseEther('10'))

        const claimMessageData = {
            account : accounts[0].address,
            amount : ethers.utils.parseEther('100'),
            data : 123457,
            chainId : 168587773,
            contract : PACCATContract.address,
        }
        
        const claimEncodedData = ethers.utils.keccak256(ethers.utils.solidityPack(
            ["address","uint256","uint256","uint256","address"],
            [claimMessageData.account, claimMessageData.amount, claimMessageData.data, claimMessageData.chainId, claimMessageData.contract]
        ));

        console.log(claimEncodedData)

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
        const signature = await wallet.signMessage(ethers.utils.arrayify(claimEncodedData));
        
        console.log(signature)
        await PACCATContract.claimToken(
            claimMessageData.amount,
            claimMessageData.data,
            signature
        )
    })


})
