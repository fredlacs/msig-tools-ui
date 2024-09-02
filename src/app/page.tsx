'use client'

import { ChangeEvent, useRef } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage, useSignTypedData } from 'wagmi'

function App() {
  const account = useAccount()
  const signer = useSignMessage()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const textRef = useRef("")

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>): void {
    textRef.current = ev.target.value;
  }


  function handleSignClick(): void {
    const text = textRef.current;
    signer.signMessage({  message: text })
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
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
        <div>{error?.message}</div>
      </div>

      <div>
        {account.status === 'connected' && (
          <div>
          <input
          onChange={((ev) => handleInputChange(ev))}
           />
          <button
            onClick={() => handleSignClick()}
          >
            Sign message
          </button>
            {signer.data && (
          <div>
              <h2>
                Signature hash
              </h2>
              <a>
                {signer.data}
              </a>
          </div>
            )}

          </div>
        )}
      </div>
    </>
  )
}

export default App
