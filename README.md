# Insurance policy smart contract
 This fullstack code is made with the help of Solidity and designed a create an insurance provider protocol for users  to provide liquidity to cover damage in the case of an insured event, and they themselves receive interest for providing liquidity.<br>
2 main components of the insurance:<br>
i) Crypto wallet insurance<br>
ii) Collateral protection for crypto backed loans:

## Description
```WalletInsurance.sol``` insurance protocol that helps owners of smart contract wallets stay protected from hackers. The owners will be paying an insurance amount per month, set by the protocol, ```LoanCollateralInsurance.sol``` file is based on the insurance policy the user has chosen, contract will give back % of the loan when the collateral value dropscontract and both the contract will be deployed on runtime using ```InsuranceFactory.sol```.
In this project new insurace contract will be created for the user corresponding to the choosed policy. and user can perfrom the transaction and operations with this. we have few functions to test the contract.```create wallet insurance``` to create a new wallet insurance from the contract. ```Create Loan Collateral Insurance``` to create the new insurance contract for loan collateral insurance. 
Then user pay the premium in exact value defined in policy neither more neigher less. Premium payment method is same for both, and in case of hacker attack, user will be eligible for claim premium

### steps of execution
```javascript 
git clone https://github.com/Ms-10182/eth-advance-mod-2.git
cd eth-advance-mod-2
```

1) open Remix ide and create ```Insurance contracts``` folder
2) upload ```WalletInsurance.sol, LoanCollateralInsurance.sol, InsuranceFactory.sol``` into it and deploy the InsuranceFactory.sol on sepolia test net.
3) copy the InsuranceFactory abi and paste in value of ```factoryABI``` in app.js, copy abi of WalletInsurance.sol paste in value of ```walletInsuranceABI``` in app.js,
copy the LoanCollateralInsurance abi and paste in value of ```loanCollateralInsuranceABI``` in app.js  and copy the contract address fo InsuranceFactory.sol in value of ```factoryAddress```.
from vs code run the index.html using live server.

### Interaction
<b>For Wallet Insurance</b>
1) Choose the insurance type and see the policy then click Create Wallet Insurance.
2) Under Interact with Wallet Insurance pay the premimum.
3) you can check current premium balance and user credit balance.
4) To perform hacker attack simulation, click simulate hacker attack. without this user can;t claim the credit.
5) Now click claim wallet insurance to get the insurance credit.<br><br>
<b>For Loan Collateral Insurance</b><br>
    Choose the insurance type and see the policy then enter loan amount and click Create Loan Collateral Insurance.
2) Under Interact with Loan Collateral Insurance pay the premimum.
3) you can check current premium balance and user credit balance.
4) To perform hacker attack simulation, click simulate hacker attack. without this user can;t claim the credit.
5) Now enter the amount which is left after the attack , if it is greater then the threshold value then user can't claim, if lower then the threshold click claim wallet insurance to get the insurance credit.


WARNING- As this is prototype, not many functionality is impletemented so dont refresh the page. if done so then all created insurance contract will be lost as there is no functions to retrive the existing contract. It can be done with further addition of functions

## Authors

Mayank Sharma  
[@Mayank](https://www.linkedin.com/in/mayank-sharma-078278243/)



