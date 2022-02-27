import abi from "./abi/abi.json";
// require('dotenv').config();

// const Web3 = require("web3");
// var web3 = new Web3(Web3.givenProvider)

// import Web3 from "web3";

const connect = new Promise((res, rej) => {
  if (typeof window.ethereum == "undefined") {
    rej("Install Metamask");
  }
  window.ethereum.request({ method: "eth_requestAccounts" });
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x8A586ccC70b3B219eA620571fC73f0E72Bb90BFA"
    // `${process.env.CONTRACT_ID}`
  );
  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .totalSupply()
      .call({ from: accounts[0] })
      .then((supply) => {
        contract.methods
          .getBuildings()
          .call({ from: accounts[0] })
          .then((data) => {
            res({ supply: supply, buildings: data });
          });
      });
  });
});

export default connect;
