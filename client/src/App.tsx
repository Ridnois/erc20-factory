import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "./style.scss";

const useETH = () => {
  const ethereum = (window as any).ethereum;
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [isMetaMask, setIsMetamask] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle first connection and set Address;
  const connect = async () => {
    if (ethereum) {
      setLoading(true);
      const addr = await ethereum.request({ method: 'eth_requestAccounts' })
      if (addr) {
        setAddress(addr);
        setIsMetamask(Boolean(ethereum.isMetaMask));
      }
      setLoading(false);
    }
  }

  // Check if we're able to use ethereum instance  
  useEffect(() => {
    if (isMetaMask) {
      ethereum.on('eth_accountsChanged', ([user]: [string]) => setAddress(user));
      ethereum.request({ method: 'eth_accounts' }).then(([user]: [string]) => setAddress(user));
    }
  }, [isMetaMask]);

  useEffect(() => {
    if (ethereum) {
      setIsMetamask(ethereum.isMetaMask)
    }
  }, []);

  return {
    address,
    chainId,
    isMetaMask,
    connect,
    loading,
    ethereum,
  }
}


const Screen = styled.div`
  background-color: rgb(242, 242, 242);
`;

const Wallet = styled.div`
  box-shadow: -0.5rem -0.5rem 0.9375rem #fff, 0.5rem 0.125rem 0.9375rem hsl(0deg 0% 69% / 60%);
  border-radius: 8px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .wallet-name {
    margin: 8px;
    border-color: #1c2d54;
    border-left-width: 1px;
    color: #1c2d54;
  }
  & .wallet-address {
    color: #1c2d54;
    width: 5  0%;
    display: flex;
    margin-right: 16px;
  }
  & .wallet-avatar {
    margin: 16px 4px 16px 8px;
    height: 32px;
    width: 32px;
    background-color: #8d95aa;
    border-radius: 50%;
    border-color: #1c2d54;
  }
`;

interface IButton {
  primary: boolean;
  borderRadius?: string;
}

const Button = styled.button<IButton>`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: ${props => props.borderRadius || '4px'};
  `;

const App = () => {
  const { address, chainId, isMetaMask, connect, ethereum, loading } = useETH();
  return (
    <Screen>
      <Wallet>
        <div className="wallet-avatar"></div>
        <h3 className="wallet-address">
          {address ? address.substring(address.length - 6) : false || !loading || < Button primary borderRadius="8px" onClick={connect}>Connect</Button>}
        </h3>
      </Wallet>
    </Screen >
  );
}

export default App;