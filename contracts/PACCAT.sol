// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract PACCAT is ERC20, ERC20Burnable, Ownable, ReentrancyGuard {
    using ECDSA for bytes32;
    
    address private signVerifier;
    uint256 private chainId;

    mapping(address => mapping(uint256 => bool)) public claimedToken;

    constructor(address _initialOwner, address _signVerifier, uint256 _chainId)
        ERC20("PACCAT", "PCT")
        Ownable(_initialOwner)
    {
        signVerifier = _signVerifier;
        chainId = _chainId;
    }

    function claimTest(address to, uint256 amount) public nonReentrant {
        _mint(to, amount);
    }

    function claimToken(
        uint256 _amount,
        uint256 _data,
        bytes memory _sig
    ) external nonReentrant {
        require(!claimedToken[msg.sender][_data], "PACCAT: already claimed");

        claimedToken[msg.sender][_data] = true;

        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, _amount, _data, chainId, this)));
        require(recoverSigner(message, _sig) == signVerifier, "PACCAT: invalid signature");

        _mint(msg.sender, _amount);
    }

     // @dev Sets a new signature verifier
    function setSignVerifier(address verifier) external onlyOwner {
        signVerifier = verifier;
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        public
        pure
        returns (address)
        {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = splitSignature(sig);
        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
    returns (uint8, bytes32, bytes32){
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }
    
        return (v, r, s);
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}
