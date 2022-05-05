//Create your wallet and send sol to interval

//import modules from solana web3 package
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js")

//create a new wallet object
const wallet = new Keypair()

//get wallet credentials
const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

//test - print put keypairs
//console.log(publicKey)
//console.log(secretKey)


//function to get and print out balance of wallet
const getWalletBalance = async() => {
  try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
      const walletBalance = await connection.getBalance(publicKey)
      console.log(`Wallet balance is ${walletBalance}`)
  } catch(err) {
      console.error(err);
  }
}

//send sol to wallet
const airDropSol = async() => {
  try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
      const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
      await connection.confirmTransaction(fromAirDropSignature)
  } catch(err) {
      console.log(err)
  }
}
const main = async() => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

main()
