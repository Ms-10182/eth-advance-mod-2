// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanCollateralInsurance {
    address public owner;
    uint256 public monthlyPremium;
    uint256 public coveragePercentage;
    uint256 public currentPremiumBalance;
    uint256 public userCreditBalance;
    uint256 public thresholdValue;
    uint public loanAmount;
    bool public active;
    bool public hackerAttack;


    event PremiumPaid(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(address _owner,uint _policyTypes,uint _loanAmount) {
        if(_policyTypes==0){
            owner = _owner;
            loanAmount=_loanAmount;
            currentPremiumBalance=0;
            monthlyPremium = 1 ;
            coveragePercentage = 80;
            userCreditBalance =0;
            thresholdValue=60;
            active = true;
        }else if(_policyTypes==1){
            owner = _owner;
            loanAmount=_loanAmount;
            currentPremiumBalance=0;
            monthlyPremium = 2 ;
            coveragePercentage = 95;
            userCreditBalance =0;
            thresholdValue=60;
            active = true;
        }else{
            revert("invalid policy");
        }

        
        
    }

    function payPremium(uint _amount) public  onlyOwner {
        require(active, "Policy is not active");
        require(currentPremiumBalance<coveragePercentage,"Premium Completed");
        require(_amount == monthlyPremium, "Incorrect premium amount");
        currentPremiumBalance+=_amount;
        emit PremiumPaid(msg.sender, _amount);
    }

    function claim(uint256 collateralValue) public onlyOwner {
        require(active, "Policy is not active");
        require(hackerAttack==true,"No hacker attacked, can,t claim");
        require(collateralValue < thresholdValue, "Collateral value is above threshold");
        uint256 payout = (loanAmount * coveragePercentage) / 100;
        userCreditBalance+=payout;
        currentPremiumBalance=0;
        active = false;
        emit Claim(msg.sender, payout);
    }
    function attack()public{
        hackerAttack=true;
    }
}