// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletInsurance {
    address public owner;
    uint256 public monthlyPremium;
    uint256 public coverageAmount;
    uint256 public currentPremiumBalance;
    uint256 public userCreditBalance;
    bool public active;
    bool public hackerAttack;


    event PremiumPaid(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(address _owner,uint _policyType) {
        if(_policyType==0){
            owner = _owner;
            currentPremiumBalance=0;
            monthlyPremium = 1 ;  
            coverageAmount = 80 ;  
            active = true;
            userCreditBalance =0;
        }else if(_policyType==1){
            owner = _owner;
            currentPremiumBalance=0;
            monthlyPremium = 2 ;  
            coverageAmount = 200 ;  
            active = true;
            userCreditBalance =0;
        }else{
            revert("invalid policy");
        }

    }

    function payPremium(uint _amount) public  onlyOwner {
        require(active, "Policy is not active");
        require(currentPremiumBalance<coverageAmount,"Premium Completed");
        require(_amount == monthlyPremium, "Incorrect premium amount");
        currentPremiumBalance+=_amount;
        emit PremiumPaid(msg.sender, _amount);
    }

    function claim() public onlyOwner {
        require(hackerAttack==true,"No hacker attacked, can,t claim");
        require(active, "Policy is not active");
        userCreditBalance+=coverageAmount;
        currentPremiumBalance=0;
        active = false;
        emit Claim(msg.sender, coverageAmount);
    }

    function attack()public{
        hackerAttack=true;
    }
}
