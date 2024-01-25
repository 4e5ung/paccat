# paccat

## 프로젝트 설명
PACCAT 프로젝트 SmartContract


## 테스트 환경 설정

npx hardhat test

### hardhat-etherscan

npx hardhat verify --network <networkname> contractaddress <constructor>

https://www.npmjs.com/package/@nomiclabs/hardhat-etherscan

### hardhat-contract-sizer

npx hardhat size-contracts

https://www.npmjs.com/package/hardhat-contract-sizer

### solidity-docgen

npx hardhat docgen

```
docgen:{
    path: './docs',
    clear: true,
    runOnCompile: false,
    pages: 'files',
    exclude: ['access', 'interfaces', "proxy", "security", "token", "utils"],
    theme: 'markdown',
    pageExtension: '.md',
}
```

https://www.npmjs.com/package/solidity-docgen

### hardhat-abi-exporter

npx hardhat export-abi

```
abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    runOnCompile: false,
    except: ['./access', "./interfaces", "./proxy", "./security", "./token", "./utils"]
}
```

https://www.npmjs.com/package/hardhat-abi-exporter

### solidity-coverage

npx hardhat coverage --testfiles "test/*.js"

https://www.npmjs.com/package/solidity-coverage

### hardhat-gas-reporter

```
gasReporter: {
    enabled: true
}
```

https://github.com/cgewecke/hardhat-gas-reporter