Here’s a professional and clear **`README.md`** for your **Tug of War** Web3 game project:

---

````markdown
# 🪢 Tug of War - Web3 Game on Monad Testnet

Tug of War is an interactive Web3 game built on the **Monad Testnet**, where players "pull" a rope by submitting on-chain transactions. The team with the strongest support wins the game!

## 🚀 Live Demo
Coming soon...

## 🧩 Features

- 🔗 On-chain game state (rope position, team scores, win status)
- 🧠 Real-time updates using Wagmi hooks and React
- 🧼 Clean UI with dynamic rope and flag movement
- 🦊 MetaMask wallet support
- ⚡ Fast transactions on Monad Testnet

---

## 📦 Tech Stack

- **Smart Contract**: Solidity, Foundry, Monad Testnet
- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Web3 Integration**: [Wagmi](https://wagmi.sh/), [viem](https://viem.sh/)
- **Wallets**: MetaMask, WalletConnect

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ROHIT8759/tug-war-game.git
cd tug-war-game
````

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Deploy Smart Contract (Monad Testnet)

1. Export your MetaMask private key.

2. Get test \$MON from [Monad Faucet](https://faucet.monad.xyz).

3. Navigate to the contracts folder:

   ```bash
   cd contracts/tug-war-contract
   cp .env.example .env
   ```

4. Update `.env`:

   ```
   MONAD=https://testnet-rpc.monad.xyz
   DEPLOYER_PRIVATE_KEY=your_private_key
   ```

5. Build and deploy:

   ```bash
   forge build
   source .env

   forge create --rpc-url $MONAD \
     --private-key $DEPLOYER_PRIVATE_KEY \
     --broadcast \
     src/TugWarContract.sol:TugWarContract \
     --constructor-args your_wallet_address
   ```

6. Copy the deployed contract address and update `src/contracts.ts`:

   ```ts
   export const wagmiContractConfig = {
     address: "YOUR_DEPLOYED_ADDRESS",
     abi: [...],
   };
   ```

---

### 4. Run the App

```bash
pnpm run dev
# or
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Game UI

* 🧍 Players can support their team by clicking a button to "pull" the rope.
* 🏁 Flag moves dynamically depending on the score.
* 🏆 First team to reach max score difference wins.

---

## 📷 Screenshots

> Add screenshots/gifs here once deployed

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Made with 💜 by [Rohit Kumar Kundu](https://github.com/ROHIT8759)

```

---

Let me know if you want a `vercel.json` or deployment instructions for Vercel/Netlify!
```
