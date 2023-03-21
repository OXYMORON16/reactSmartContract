import React, { useState } from "react";
import Web3 from "web3";
import ContractABI from "./ContractABI.json";

import "./App.css";

function App() {
  // Create a state variable for the message
  const [message, setMessage] = useState("");

  // Create a new Web3 instance
  const web3 = new Web3(window.ethereum);

  // Create a new contract instance using the ContractABI and the contract address
  const RemixContract = new web3.eth.Contract(
    ContractABI,
    "0x04D16c9376BBb1A56983837b4F70760c9BC41e8c"
  );

  // A function to set the message on the contract
  const setData = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
  
    // Estimate the gas needed to execute the setMessage function on the contract
    const gas = await RemixContract.methods.setMessage(message).estimateGas();
  
    // Call the setMessage function on the contract and send a transaction with the message and gas
    const result = await RemixContract.methods
      .setMessage(message)
      .send({ from: account, gas });
  
    console.log(result);
  };
  
  // A function to get the default message from the contract
  const getDefaultData = async (e) => {
    RemixContract.methods
      .defaultMessage()
      .call()
      .then(console.log);
  };

  // A function to get the current message from the contract
  const getData = async (e) => {
    const message = await RemixContract.methods.getMessage().call();
    setMessage(message);
  };

  // Render the form to set the message and buttons to get the messages
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={setData}>
          <label>
            Set Message:
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Message" />
        </form>
        <br />
        <button onClick={getData} type="button">
          Get Message
        </button>
      
      </header>
    </div>
  );
}

export default App;
