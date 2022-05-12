const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey= require('./secrets.json').privateKey;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8765,            // Standard Huygen port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    huygens: {
      provider: () => new HDWalletProvider([privateKey], `https://huygens.computecoin.network/`),
      network_id: 828,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // A version or constraint - Ex. "^0.8.0"
    }
  }
}
