import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getWalletInfoFromEtherscan = async (wallet) => {
  const txURL = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
  const balURL = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

  const [txRes, balRes] = await Promise.all([
    axios.get(txURL),
    axios.get(balURL)
  ]);

  return {
    balance: balRes.data.result,
    transactions: txRes.data.result
  };
};

const buildPrompt = (wallet, etherscanData) => {
  return `
Evaluate if this Ethereum wallet is likely controlled by a bot on a scale from 0.0 to 10.0.

### Wallet Address:
${wallet}

### Balance:
${etherscanData.balance}

### Transaction History:
${etherscanData.transactions.slice(0, 5).map((tx, i) => `Tx ${i + 1}: from ${tx.from} to ${tx.to}, value: ${tx.value}, timestamp: ${tx.timeStamp}`).join('\n')}

Give a number from 0.0 (definitely human) to 10.0 (definitely a bot). Just return the number.
`;
};

const queryGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  const res = await axios.post(url, {
    contents: [{
      parts: [{ text: prompt }]
    }]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': GEMINI_API_KEY
    }
  });

  return res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Error";
};

app.get('/wallet/:wallet', async (req, res) => {
  const wallet = req.params.wallet;

  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  try {
    const etherscanData = await getWalletInfoFromEtherscan(wallet);
    const prompt = buildPrompt(wallet, etherscanData);
    const score = await queryGemini(prompt);
    res.json({ score });
  } catch (err) {
    console.error("Gemini or Etherscan error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to evaluate wallet" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
