'use client';

import { useState } from 'react';
import { useVerifyMessage } from 'wagmi';

const VerifySignature: React.FC = () => {
    const [account, setAccount] = useState("")
    const [msg, setMsg] = useState("")
    const [sigHash, setSigHash] = useState("")

    const verifiedMessage = useVerifyMessage({
        address: account as any,
        message: msg,
        signature: sigHash as any,
    })

    return (
        <div className="container">
            <div>
                <h2>Account</h2>
                <input
                    type="text"
                    onChange={e => setAccount(e.target.value)}
                    placeholder="Account address"
                />
                <h2>Message</h2>
                <input
                    type="text"
                    onChange={e => setMsg(e.target.value)}
                    placeholder="Message"
                />
                <h2>Signature Hash</h2>
                <input
                    type="text"
                    onChange={e => setSigHash(e.target.value)}
                    placeholder="Signature hash"
                />
            </div>

            <button onClick={() => { verifiedMessage.refetch() }}>Sign message</button>

            {verifiedMessage.isFetched && !verifiedMessage.isLoading && !verifiedMessage.isPending && (
                <>
                    <h2>Signature validation: </h2>
                    {verifiedMessage.data ? "Valid" : "Invalid"}
                </>
            )}

            {verifiedMessage.isError && (
                <>
                    <h2>Error</h2>
                    {verifiedMessage.error.message}
                </>
            )}
        </div>
    );
};

export default VerifySignature;
