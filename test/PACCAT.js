import { expect, assert } from "chai";
import { keccak256 } from "ethereumjs-util"
import pkg from 'hardhat';
const { ethers } = pkg;

describe("PacCat 테스트", function () {

    const MaxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

    let accounts    
    let chainId
    let PACCATContract
        
    //hardhat accounts 0
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

    before(async function () { 
        accounts = await ethers.getSigners()    
        chainId = (await ethers.getDefaultProvider().getNetwork()).chainId    
    })

    describe("민팅 테스트", function () {

        beforeEach(async function () {            
            PACCATContract = await (await ethers.getContractFactory("PacCat")).deploy(
                accounts[0].address,
                accounts[0].address, 
                chainId,
            )
        })
  

        it("claimTest, 테스트", async function(){   
            await PACCATContract.claimTest(accounts[0].address, ethers.utils.parseEther('10'))

            expect(await PACCATContract.balanceOf(accounts[0].address)
            ).to.equal(ethers.utils.parseEther('10'))
        })

        it("claimToken, 테스트", async function(){               
            const claimMessageData = {
                account : accounts[0].address,
                amount : ethers.utils.parseEther('10'),
                data : 123456,
                chainId : chainId,
                contract : PACCATContract.address,
            }
    
            const claimEncodedData = ethers.utils.keccak256(ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256",  "address"],
                [claimMessageData.account, claimMessageData.amount, claimMessageData.data, claimMessageData.chainId, claimMessageData.contract]
            ));

            const wallet = new ethers.Wallet(privateKey);
            const signature = await wallet.signMessage(ethers.utils.arrayify(claimEncodedData));

            await PACCATContract.claimToken(
                claimMessageData.amount,
                claimMessageData.data,
                signature
            )

        })
    })
})
