
# 🤖 BotFilter: Open-Source Wallet Quality Scoring API for NFT Minting

> A Monad Mission 5 Track 2 submission  
> Built to detect suspicious wallets and protect NFT mint integrity.

---

## 🧠 What It Does

**BotFilter** is an open-source backend API that evaluates Ethereum wallet addresses and scores them based on how likely they are to be **bot-controlled**.

This helps NFT platforms **block spam, sybil attacks, and unfair mints** — while keeping minting accessible to real, human users.

---

## 🔍 How It Works

1. User enters or connects their wallet.
2. The wallet address is queried against **Etherscan**:
   - Fetches latest balance
   - Retrieves full transaction history
3. A dynamic prompt is constructed describing the wallet behavior.
4. The prompt is sent to **Gemini 2.0 Flash** (Google's LLM API).
5. Gemini returns a **score between 0.0 and 10.0**:
   - `0.0 = definitely human`
   - `10.0 = definitely a bot`
6. This score can then be used to:
   - Block minting (`score > threshold`)
   - Display warnings
   - Log or flag suspicious activity

---

## 🧰 Tech Stack

- 🔧 **Node.js + Express** – API Server
- 🔗 **Etherscan API** – Wallet history & balance
- 🤖 **Gemini Flash API (LLM)** – Bot-likelihood scoring
- 🌐 **HTML/JS Demo Page** – Frontend minting simulation

---

## 🚀 Live Use Case: Mint Gatekeeping

You can plug this API into **any NFT minting flow** to prevent sybil minting or multi-wallet spam.

```js
// Example logic:
if (score > 6.5) {
  return res.status(403).json({ error: "Bot-like wallet. Minting denied." });
}
````

---

## ✨ Why It’s Unique

* Uses **LLM reasoning (Gemini)** instead of heuristics
* Evaluates full wallet behavior, not just presence
* Plug-and-play for NFT projects
* **Fully open-source**, no paywall or signup required
* Promotes **fair minting culture** and improves trust

---

## 💡 Installation

```bash
git clone https://github.com/YOUR_USERNAME/botfilter.git
cd botfilter
npm install
```

### 🌍 Create a `.env` file:

```env
ETHERSCAN_API_KEY=your_etherscan_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧪 Run It

```bash
npm run dev
```

* API is live at: `http://localhost:3000/wallet/<wallet_address>`

Example:

```bash
curl http://localhost:3000/wallet/0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

Response:

```json
{
  "score": "2.5"
}
```

---

## 🧪 Mint Demo Page

Launch the `mint.html` page in a browser to simulate NFT minting logic with wallet score checks.

### Features:

* Score visualization
* Inline JS logic to block high-score wallets
* No need for a wallet connection

---

## 🧠 Score Interpretation

| Score Range  | Meaning      | Action            |
| ------------ | ------------ | ----------------- |
| `0.0 - 3.0`  | Human-like   | ✅ Minting allowed |
| `3.1 - 6.5`  | Suspicious   | ⚠️ Warn user      |
| `6.6 - 10.0` | Likely a bot | ❌ Block minting   |

---

## 🏆 Mission 5: Track 2 – NFT Tooling

This project is designed for **Monad Foundation’s Mission 5**, under **Track 2: NFT Tooling**.

### 📜 Goals it supports:

* ✅ Preventing unfair mint advantages
* ✅ Promoting healthy and fair NFT launches
* ✅ Leveraging AI to improve on-chain experiences

### Bonus:

* Fully open-source
* Could integrate with **Monanimals lore** for wallet scoring in the future

📝 Submit yours: [https://tally.so/r/mDE6bX](https://tally.so/r/mDE6bX)

---

## 📖 License

MIT — Use it, fork it, expand it!

---

## 🤝 Contributions Welcome

If you want to extend this tool to:

* Train a local bot classifier
* Add NFT mint whitelisting logic
* Build with Monad Testnet integrations

Feel free to fork or open a PR.

---

## ✍️ Built By

**\[Your Name]** – for Monad Mission 5
DM on Twitter: \[@yourhandle]
Project Link: `https://github.com/YOUR_USERNAME/botfilter`
