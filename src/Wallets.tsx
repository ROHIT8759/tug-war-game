import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Wallets() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="wallet-container">
      <div className="wallet-section">
        <h2 className="wallet-title">Wallet Connection</h2>
        <div className="wallet-content">
          <div className="wallet-info">
            <div>Status: <span className="wallet-status">{account.status}</span></div>
            {account.chainId && <div>Chain ID: <span className="wallet-chainid">{account.chainId}</span></div>}
            {account.address && (
              <div>Address: <span className="wallet-address">
                {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}
              </span></div>
            )}
          </div>

          <div className="wallet-actions">
            {account.status === 'connected' ? (
              <button
                className="wallet-button disconnect"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            ) : (
              <div className="wallet-connectors">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="wallet-button connect"
                  >
                    {connector.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {status && <div className="wallet-status">{status}</div>}
        {error && <div className="wallet-error">{error.message}</div>}
      </div>
    </div>
  )
}