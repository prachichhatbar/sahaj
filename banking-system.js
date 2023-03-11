// Define the accounts data structure
let accounts = [];

// Function to generate a new account number
function generateAccountNumber() {
  let min = 100000;
  let max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a new account
function createAccount() {
  let accountHolderName = document.getElementById('accountHolderName').value;
  let accountNumber = generateAccountNumber();
  let account = {
    accountNumber: accountNumber,
    accountHolderName: accountHolderName,
    balance: 0,
    deposits: 0,
    withdrawals: 0,
    logs: [] // array to store logs
  };
  accounts.push(account);
  document.getElementById('output').innerHTML = `Account created with number ${accountNumber}`;
}

// Function to deposit an amount into an account
function deposit() {
  let accountNumber = parseInt(document.getElementById('depositAccountNumber').value);
  let depositAmount = parseInt(document.getElementById('depositAmount').value);
  let account = accounts.find(a => a.accountNumber === accountNumber);
  if (!account) {
    document.getElementById('output').innerHTML = `Account ${accountNumber} not found`;
  } else if (depositAmount < 500 || depositAmount > 50000) {
    document.getElementById('output').innerHTML = `Deposit amount should be between $500 and $50,000`;
  } else if (account.deposits >= 3) {
    document.getElementById('output').innerHTML = `Maximum 3 deposits allowed per day`;
  } else if (account.balance + depositAmount > 100000) {
    document.getElementById('output').innerHTML = `Account balance cannot exceed $100,000`;
  } else { // Execute the deposit
    account.balance += depositAmount;
    account.deposits++;
    // Add a log entry
    account.logs.push({type: "Deposit", amount: depositAmount, date: new Date()});
    document.getElementById('output').innerHTML = `Deposit of $${depositAmount} successful. New balance is $${account.balance}`;
  }
}

// Function to withdraw an amount from an account
function withdraw() {
  let accountNumber = parseInt(document.getElementById('withdrawAccountNumber').value);
  let withdrawalAmount = parseInt(document.getElementById('withdrawalAmount').value);
  let account = accounts.find(a => a.accountNumber === accountNumber);
  if (!account) {
    document.getElementById('output').innerHTML = `Account ${accountNumber} not found`;
  } else if (withdrawalAmount < 1000 || withdrawalAmount > 25000) {
    document.getElementById('output').innerHTML = `Withdrawal amount should be between $1,000 and $25,000`;
  } else if (account.withdrawals >= 3) {
    document.getElementById('output').innerHTML = `Maximum 3 withdrawals allowed per day`;
  } else if (account.balance - withdrawalAmount < 0) {
    document.getElementById('output').innerHTML = `Insufficient balance`;
  } else { // Execute the withdrawal
    account.balance -= withdrawalAmount;
    account.withdrawals++;
    // Add a log entry
    account.logs.push({type: "Withdrawal", amount: withdrawalAmount, date: new Date()});
    document.getElementById('output').innerHTML =  `Withdrawal of $${withdrawalAmount} successful. New balance is $${account.balance}`;
    }
    }
    
    // Function to transfer an amount from one account to another
    function transfer() {
        let sourceAccountNumber = parseInt(document.getElementById('sourceAccountNumber').value);
        let targetAccountNumber = parseInt(document.getElementById('targetAccountNumber').value);
        let transferAmount = parseInt(document.getElementById('transferAmount').value);
        let sourceAccount = accounts.find(a => a.accountNumber === sourceAccountNumber);
        let targetAccount = accounts.find(a => a.accountNumber === targetAccountNumber);
        if (!sourceAccount) {
        document.getElementById('output').innerHTML = `Source account ${sourceAccountNumber} not found`;
        } else if (!targetAccount) {
        document.getElementById('output').innerHTML = `Target account ${targetAccountNumber} not found`;
        } else if (transferAmount < 1000 || transferAmount > 25000) {
        document.getElementById('output').innerHTML = `Transfer amount should be between $1,000 and $25,000`;
        } else if (sourceAccount.withdrawals >= 3) {
        document.getElementById('output').innerHTML =`Maximum 3 withdrawals allowed per day from source accoun`;
        } else if (targetAccount.deposits >= 3) {
        document.getElementById('output').innerHTML =`Maximum 3 deposits allowed per day to target account`;
        } else if (sourceAccount.balance - transferAmount < 0) {
        document.getElementById('output').innerHTML = `Insufficient balance in source account`;
        } else if (targetAccount.balance + transferAmount > 100000) {
        document.getElementById('output').innerHTML = `Target account balance cannot exceed $100,000`;
        } else {
        // Execute the transfer
        sourceAccount.balance -= transferAmount;
        sourceAccount.withdrawals++;
        targetAccount.balance += transferAmount;
        targetAccount.deposits++;
        document.getElementById('output').innerHTML = `Transferof $${transferAmount} from account ${sourceAccountNumber} to account ${targetAccountNumber} successful. New balance of source account is $${sourceAccount.balance}. New balance of target account is $${targetAccount.balance}.`;
    }
    }
    
    
    // Function to display all logs for an account
    function displayLogs() {
    let accountNumber = parseInt(document.getElementById('displayLogsAccountNumber').value);
    let account = accounts.find(a => a.accountNumber === accountNumber);
    if (!account) {
    document.getElementById('output').innerHTML = `Account ${accountNumber} not found`;
    } else {
        let logEntries = account.logs.map(entry => `${entry.type} of $${entry.amount} on ${entry.date}`);
    document.getElementById('output').innerHTML = logEntries.join('<br>');
    }
    }
   

// Reset the form
function resetForm() {
document.getElementById('accountHolderName').value = '';
document.getElementById('depositAccountNumber').value = '';
document.getElementById('depositAmount').value = '';
document.getElementById('withdrawAccountNumber').value = '';
document.getElementById('withdrawalAmount').value = '';
document.getElementById('balanceAccountNumber').value = '';
document.getElementById('sourceAccountNumber').value = '';
document.getElementById('targetAccountNumber').value = '';
document.getElementById('transferAmount').value = '';
document.getElementById('output').innerHTML = '';
}

// Bind event listeners to buttons
document.getElementById('createAccountButton').addEventListener('click', createAccount);
document.getElementById('depositButton').addEventListener('click', deposit);
document.getElementById('withdrawButton').addEventListener('click', withdraw);
document.getElementById('balanceButton').addEventListener('click', getBalance);
document.getElementById('transferButton').addEventListener('click', transfer);
document.getElementById('resetButton').addEventListener('click', resetForm);
   
