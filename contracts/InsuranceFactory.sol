// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WalletInsurance.sol";
import "./LoanCollateralInsurance.sol";

contract InsuranceFactory {
    address[] public walletInsurances;
    address[] public loanCollateralInsurances;

    function createWalletInsurance(uint _choice) public {
        if (_choice == 0) {
            WalletInsurance newInsurance = new WalletInsurance(msg.sender,0);
            walletInsurances.push(address(newInsurance));
        } else if (_choice == 1) {
            WalletInsurance newInsurance = new WalletInsurance(msg.sender,1);
            walletInsurances.push(address(newInsurance));
        } else {
            revert("wrong input");
        }
    }

    function createLoanCollateralInsurance(uint _choice,uint256 _loanAmount) public {
        if (_choice == 0) {
            LoanCollateralInsurance newInsurance = new LoanCollateralInsurance(msg.sender,0,_loanAmount);
            loanCollateralInsurances.push(address(newInsurance));
        } else if (_choice == 1) {
            LoanCollateralInsurance newInsurance = new LoanCollateralInsurance(msg.sender,1,_loanAmount);
            loanCollateralInsurances.push(address(newInsurance));
        } else {
            revert("wrong input");
        }
    }

    function getWalletInsurances() public view returns (address[] memory) {
            return walletInsurances;
        
    }

    function getLoanCollateralInsurances() public view returns (address[] memory) {
            return loanCollateralInsurances;
    }
}