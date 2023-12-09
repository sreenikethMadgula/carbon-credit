import { useState, useEffect } from 'react'
import './App.css'
import { AirstackProvider, useQuery } from '@airstack/airstack-react'
import MyComponent from './components/AirStackInt'
import Web3 from 'web3';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import HomePage from './pages/Homepage';

function App() {
  const [count, setCount] = useState(0)
  const [walletAddress, setWalletAddress] = useState('');
  const [web3, setWeb3] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
        try {
            // Requesting access to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Creating Web3 instance
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            // Get the selected account
            // console.log("A",web3Instance.eth.getUncle)
            const accounts = await web3Instance.eth.getAccounts();
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]); // Set the wallet address in state
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.error('MetaMask extension not detected');
    }
};

  const pushProtocolNotification = async () => {
    const privateKey = 'fbd5eb49fd8ab7c2fcd018be5e94ce6d87d3936fdd2190fba94a0d0a0ed24712';
    const wallet = new ethers.Wallet(privateKey)
    const signer = wallet.address;
    const userAlice = await PushAPI.initialize(signer,{ env: 'staging' });
    const apiResponse = await userAlice.channel.send(['*'], { 
      notification: {
        title: 'Hello World Notification',
        body: 'Web3 native notifications are here!',
      }
    });
    console.log(apiResponse)
  }

  useEffect(() => {
    pushProtocolNotification()
  },[walletAddress])

  return (
    <>
      <HomePage/>
    </>
    // <AirstackProvider apiKey='11cc19b7baa3c4ae9a4fc215d14e2258a'>
    //   <MyComponent/>
    //   <button onClick={() => connectToMetaMask()}>Connect Wallet</button>
      
    //   <div>
    //       <h2>MetaMask Integration</h2>
    //       {walletAddress ? (
    //         <p>Wallet Address: {walletAddress}</p>
    //       ) : (
    //         <p>Connect to MetaMask to retrieve the wallet address.</p>
    //       )}
    //     </div>
    // </AirstackProvider>
  )
}

export default App
