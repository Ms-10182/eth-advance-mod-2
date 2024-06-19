const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let factoryContract;

const factoryAddress = "0xf0835b5f8E37b13D57C98cf7EDB1d798B11195fe";
const factoryABI =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_loanAmount",
				"type": "uint256"
			}
		],
		"name": "createLoanCollateralInsurance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_choice",
				"type": "uint256"
			}
		],
		"name": "createWalletInsurance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLoanCollateralInsurances",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWalletInsurances",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loanCollateralInsurances",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "walletInsurances",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const walletInsuranceABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_policyType",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claim",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PremiumPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "active",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "attack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coverageAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentPremiumBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hackerAttack",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "monthlyPremium",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "payPremium",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userCreditBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const loanCollateralInsuranceABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_policyTypes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_loanAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claim",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PremiumPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "active",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "attack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "collateralValue",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coveragePercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentPremiumBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hackerAttack",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "loanAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "monthlyPremium",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "payPremium",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thresholdValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userCreditBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function connect() {
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    factoryContract = new ethers.Contract(factoryAddress, factoryABI, signer);
}

connect();

async function createWalletInsurance() {
    const walletType = document.getElementById("walletType").value;
    try {
        const tx = await factoryContract.createWalletInsurance(walletType);
        await tx.wait();
        const walletInsurances = await factoryContract.getWalletInsurances();
        const latestWalletInsurance = walletInsurances[walletInsurances.length - 1];
        document.getElementById("walletInsuranceOutput").innerText = `Wallet Insurance created at: ${latestWalletInsurance}`;
        console.log(`Wallet Insurance created at: ${latestWalletInsurance}`);
        addOptionToSelect("walletInsuranceSelect", latestWalletInsurance);
    } catch (error) {
        console.error(error);
        alert("Error creating wallet insurance.");
        console.log("Error creating wallet insurance.")
    }
}

async function createLoanCollateralInsurance() {
    const loanType = document.getElementById("loanType").value;
    const loanAmount = document.getElementById("loanAmount").value;
    try {
        const tx = await factoryContract.createLoanCollateralInsurance(loanType, loanAmount);
        await tx.wait();
        const loanInsurances = await factoryContract.getLoanCollateralInsurances();
        const latestLoanInsurance = loanInsurances[loanInsurances.length - 1];
        document.getElementById("loanInsuranceOutput").innerText = `Loan Collateral Insurance created at: ${latestLoanInsurance}`;
        console.log(`Loan Collateral Insurance created at: ${latestLoanInsurance}`);
        addOptionToSelect("loanInsuranceSelect", latestLoanInsurance);
    } catch (error) {
        console.error(error);
        alert("Error creating loan collateral insurance.");
        console.log("Error creating loan collateral insurance.");
    }
}

async function payWalletPremium() {
    const walletContractAddress = document.getElementById("walletInsuranceSelect").value;
    const walletPremiumAmount = document.getElementById("walletPremiumAmount").value;
    const walletContract = new ethers.Contract(walletContractAddress, walletInsuranceABI, signer);

    try {
        const tx = await walletContract.payPremium(walletPremiumAmount);
        await tx.wait();
        alert("Wallet Premium Paid successfully!");
        console.log("Wallet Premium Paid successfully!");
    } catch (error) {
        console.error(error);
        alert("Error paying wallet premium.");
        console.log("Error paying wallet premium.");
    }
}

async function claimWalletInsurance() {
    const walletContractAddress = document.getElementById("walletInsuranceSelect").value;
    const walletContract = new ethers.Contract(walletContractAddress, walletInsuranceABI, signer);

    try {
        const tx = await walletContract.claim();
        await tx.wait();
        alert("Wallet Insurance Claimed successfully!");
        console.log("Wallet Insurance Claimed successfully!");
    } catch (error) {
        console.error(error);
        alert("Error claiming wallet insurance.");
        console.log("Error claiming wallet insurance.");
    }
}

async function attackWalletInsurance() {
    const walletContractAddress = document.getElementById("walletInsuranceSelect").value;
    const walletContract = new ethers.Contract(walletContractAddress, walletInsuranceABI, signer);

    try {
        const tx = await walletContract.attack();
        await tx.wait();
        alert("Simulated Hacker Attack successfully!");
        console.log("Simulated Hacker Attack successfully!");
    } catch (error) {
        console.error(error);
        alert("Error simulating hacker attack.");
        console.log("Error simulating hacker attack.");
    }
}

async function getWalletCurrentPremiumBalance() {
    const walletContractAddress = document.getElementById("walletInsuranceSelect").value;
    const walletContract = new ethers.Contract(walletContractAddress, walletInsuranceABI, signer);

    try {
        const balance = await walletContract.currentPremiumBalance();
        document.getElementById("walletCurrentPremiumBalance").innerText = `Current Premium Balance: ${balance}`;
		console.log(`Current Premium Balance: ${balance}`);
    } catch (error) {
        console.error(error);
        alert("Error fetching current premium balance.");
        console.log("Error fetching current premium balance.");
    }
}

async function getWalletUserCreditBalance() {
    const walletContractAddress = document.getElementById("walletInsuranceSelect").value;
    const walletContract = new ethers.Contract(walletContractAddress, walletInsuranceABI, signer);

    try {
        const balance = await walletContract.userCreditBalance();
        document.getElementById("walletUserCreditBalance").innerText = `User Credit Balance: ${balance}`;
		console.log(`User Credit Balance: ${balance}`);
    } catch (error) {
        console.error(error);
        alert("Error fetching user credit balance.");
        console.log("Error fetching user credit balance.");
    }
}

async function payLoanPremium() {
    const loanContractAddress = document.getElementById("loanInsuranceSelect").value;
    const loanPremiumAmount = document.getElementById("loanPremiumAmount").value;
    const loanContract = new ethers.Contract(loanContractAddress, loanCollateralInsuranceABI, signer);

    try {
        const tx = await loanContract.payPremium(loanPremiumAmount);
        await tx.wait();
        alert("Loan Premium Paid successfully!");
        console.log("Loan Premium Paid successfully!");
    } catch (error) {
        console.error(error);
        alert("Error paying loan premium.");
    }
}

async function claimLoanInsurance() {
    const loanContractAddress = document.getElementById("loanInsuranceSelect").value;
    const collateralValue = document.getElementById("collateralValue").value;
    const loanContract = new ethers.Contract(loanContractAddress, loanCollateralInsuranceABI, signer);

    try {
        const tx = await loanContract.claim(collateralValue);
        await tx.wait();
        alert("Loan Insurance Claimed successfully!");
        console.log("Loan Insurance Claimed successfully!");
    } catch (error) {
        console.error(error);
        alert("Error claiming loan insurance.");
    }
}

async function attackLoanInsurance() {
    const loanContractAddress = document.getElementById("loanInsuranceSelect").value;
    const loanContract = new ethers.Contract(loanContractAddress, loanCollateralInsuranceABI, signer);

    try {
        const tx = await loanContract.attack();
        await tx.wait();
        alert("Simulated Hacker Attack successfully!");
        console.log("Simulated Hacker Attack successfully!");
    } catch (error) {
        console.error(error);
        alert("Error simulating hacker attack.");
    }
}

async function getLoanCurrentPremiumBalance() {
    const loanContractAddress = document.getElementById("loanInsuranceSelect").value;
    const loanContract = new ethers.Contract(loanContractAddress, loanCollateralInsuranceABI, signer);

    try {
        const balance = await loanContract.currentPremiumBalance();
        document.getElementById("loanCurrentPremiumBalance").innerText = `Current Premium Balance: ${balance}`;
		console.log(`Current Premium Balance: ${balance}`);
    } catch (error) {
        console.error(error);
        alert("Error fetching current premium balance.");
        console.log("Error fetching current premium balance.");
    }
}

async function getLoanUserCreditBalance() {
    const loanContractAddress = document.getElementById("loanInsuranceSelect").value;
    const loanContract = new ethers.Contract(loanContractAddress, loanCollateralInsuranceABI, signer);

    try {
        const balance = await loanContract.userCreditBalance();
        document.getElementById("loanUserCreditBalance").innerText = `User Credit Balance: ${balance}`;
		console.log(`User Credit Balance: ${balance}`)
    } catch (error) {
        console.error(error);
        alert("Error fetching user credit balance.");
        console.log("Error fetching user credit balance.");
    }
}

function addOptionToSelect(selectId, address) {
    const select = document.getElementById(selectId);
    const option = document.createElement("option");
    option.value = address;
    option.text = address;
    select.add(option);
}

function showWalletPolicyDetails() {
    const walletType = document.getElementById("walletType").value;
    const detailsDiv = document.getElementById("walletPolicyDetails");
    let details;

    if (walletType == 0) {
        details = `
            <h3>Wallet Insurance Type 1</h3>
            <p>Monthly Premium: 1 ETH</p>
            <p>Coverage Amount: 80 ETH</p>
        `;
    } else if (walletType == 1) {
        details = `
            <h3>Wallet Insurance Type 2</h3>
            <p>Monthly Premium: 2 ETH</p>
            <p>Coverage Amount: 200 ETH</p>
        `;
    }

    detailsDiv.innerHTML = details;
}

function showLoanPolicyDetails() {
    const loanType = document.getElementById("loanType").value;
    const detailsDiv = document.getElementById("loanPolicyDetails");
    let details;

    if (loanType == 0) {
        details = `
            <h3>Loan Collateral Insurance Type 1</h3>
            <p>Monthly Premium: 1 ETH</p>
            <p>Coverage Percentage: 80%</p>
            <p>Threshold Value: 60 ETH</p>
        `;
    } else if (loanType == 1) {
        details = `
            <h3>Loan Collateral Insurance Type 2</h3>
            <p>Monthly Premium: 2 ETH</p>
            <p>Coverage Percentage: 95%</p>
            <p>Threshold Value: 60 ETH</p>
        `;
    }

    detailsDiv.innerHTML = details;
}
