import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
    useReadContracts,
    useBlockNumber,
} from 'wagmi'
import { wagmiContractConfig } from './contracts'
import "./index.css"
import { useEffect } from 'react'

function App() {
    const ropePosition = 0
    const team1Score = 0
    const team2Score = 0
    
    const { data: hash, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })
    
    const {
        data,
        error,
        isPending,
        refetch
    } = useReadContracts({
        contracts: [{
            ...wagmiContractConfig,
            functionName: 'ropePosition',
        }, {
            ...wagmiContractConfig,
            functionName: 'maxScoreDifference',
        }, {
            ...wagmiContractConfig,
            functionName: 'team1Score',
        }, {
            ...wagmiContractConfig,
            functionName: 'team2Score',
        }, {
            ...wagmiContractConfig,
            functionName: 'getWinStatus',
        },]
    })

    const { data: blockNumber } = useBlockNumber({ watch: true })

    useEffect(() => {
        if (blockNumber && blockNumber % BigInt(5) === BigInt(0)) refetch()
    }, [blockNumber])
      
    const [ropePositionOnChain, maxScoreDifferenceOnChain, team1ScoreOnChain, team2ScoreOnChain, winStatusOnChain] = data || []

    if (isPending) return <div>Loading...</div>

    if (error)
        return (
            <div>
                Error: {(error as BaseError).shortMessage || error.message}
            </div>
        )

    const pullRope = (isTeam1: boolean) => {
        writeContract({
            address: wagmiContractConfig.address,
            abi: wagmiContractConfig.abi,
            functionName: 'pull',
            args: [isTeam1],
        })
    }

    const flagOffset = (ropePositionOnChain?.result && maxScoreDifferenceOnChain?.result) 
        ? Number(ropePositionOnChain.result) * 40 / Number(maxScoreDifferenceOnChain.result) * 5 
        : ropePosition * 5

    console.log("Rendering with rope position:", ropePosition, "Flag offset:", flagOffset)

    return (
        <div className="tug-of-war-container">
            <h1 className="tug-of-war-title">Tug of War</h1>
            <div className="tug-of-war-score-board">
                <div className="tug-of-war-team1-score">Team 1 scores: {team1ScoreOnChain?.result ?? team1Score}</div>
                <div className="tug-of-war-team2-score">Team 2 scores: {team2ScoreOnChain?.result ?? team2Score}</div>
            </div>


            {(winStatusOnChain && Number(winStatusOnChain.result) === 1) && <h1 className="tug-of-war-title">Team 1 Win</h1>}
            {(winStatusOnChain && Number(winStatusOnChain.result) === 2) && <h1 className="tug-of-war-title">Team 2 Win</h1>}

            <div className="tug-of-war-field">
                <div className="tug-of-war-team1">Team 1</div>

                <div
                    className="tug-of-war-rope-line"
                    style={{
                        "--flag-offset": `${flagOffset}%`
                    } as React.CSSProperties & { '--flag-offset': string }}
                >
                    <div className="tug-of-war-rope-center"></div>
                    <div className="tug-of-war-flag">
                        <div className="tug-of-war-flag-triangle"></div>

                    </div>
                </div>
                <div className="tug-of-war-team2">Team 2</div>
            </div>

            <div className="tug-of-war-controls">
                <button className="tug-of-war-pull-button" onClick={() => pullRope(true)}>Cheer for Team 1</button>
                <button className="tug-of-war-pull-button" onClick={() => pullRope(false)}>Cheer for Team 2</button>
            </div>
            <div className="m-4">
                <p>[OnChain] ropePosition: {ropePositionOnChain?.result ?? 0},
                    team1Score: {team1ScoreOnChain?.result ?? 0},
                    team2Score: {team2ScoreOnChain?.result ?? 0}
                </p>
                {isPending && 'Confirming...'}

                {hash && <div>Transaction Hash:
                    <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank">{hash.substring(0, 6) + "..." + hash.substring(hash.length - 4)}</a>
                </div>
                }

                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error}</div>
                )}

            </div>
        </div>
    )
}

export default App