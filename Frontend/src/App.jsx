import { useState, useEffect } from 'react'
import './App.css'
import { AirstackProvider, useQuery } from '@airstack/airstack-react'
import MyComponent from './components/AirStackInt'
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import HomePage from './pages/Homepage';
import { Route, Routes } from "react-router-dom";
import MarketPlace from '../src/pages/Marketplace/Marketplace';


function App() {
  const [count, setCount] = useState(0)


  

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

  // useEffect(() => {
  //   pushProtocolNotification()
  // },[walletAddress])

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/marketplace' element={<MarketPlace/>}/>
    </Routes>

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
