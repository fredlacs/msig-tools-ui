'use client';

import { ChangeEvent, useRef } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import CopyToClipboardInput from './CopyToClipboardInput';

const AccountAccordion: React.FC = () => {
  const account = useAccount();
  const signer = useSignMessage();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const textRef = useRef('');

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>): void {
    textRef.current = ev.target.value;
  }

  function handleSignClick(): void {
    const text = textRef.current;
    signer.signMessage({ message: text });
  }

  return (
    <div className="container">
      <div>
        <h2>Account</h2>
        <div>
          <strong>Status:</strong> {account.status}
          <br />
          <strong>Addresses:</strong> {JSON.stringify(account.addresses)}
          <br />
          <strong>ChainId:</strong> {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        {error && <div style={{ color: 'red' }}>{error.message}</div>}
      </div>

      {account.status === 'connected' && (
        <div>
          <h2>Sign Message</h2>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter message to sign"
          />
          <button onClick={handleSignClick}>Sign message</button>
          {signer.data && <CopyToClipboardInput value={signer.data} />}
        </div>
      )}
    </div>
  );
};

export default AccountAccordion;
