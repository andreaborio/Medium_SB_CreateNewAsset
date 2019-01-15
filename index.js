const sb = require('stellarburrito')
let masterAccount = sb.StellarSdk.Keypair.fromSecret('SD4XRWJ367PLQGERB5V3IG5KZHARQLWFIJLEPLICREOAFTP54PKPT7HI');
let accounts = [];

(async function loop() {
    for (let i = 0; i < 2; i++) {
        await sb.accountOperations.createAccount(masterAccount.secret())
            .then(result => {
                accounts[i] = result
            })
            .catch(err => {
                throw err
            })

    }
})()
.then(() => {
    sb.assetOperations.createAsset(accounts[0].privateKey, accounts[1].privateKey, '500', 'BurritoCoin')
        .then(result => {
            console.log(result + ' \n\r' +
                'Issuer \n\r' + accounts[0].publicKey + '\n\r' + accounts[0].privateKey + '\n\r' +
                'Distributor \n\r' + accounts[1].publicKey + '\n\r'+ accounts[1].privateKey + '\n\r')
        })
        .catch(err => {
            console.log(err)
        })
})