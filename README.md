# NFT Transfer Detection
A front-end that prints transfer transactions by means of an input box where you can specify any contract. I used the [WAGMI library](https://github.com/tmm/wagmi) as a baseline.

## Prereqs
- Metamask Wallet or equivalent
- Nodejs and reactjs

## Setup Instructions (For Running Locally)
1. First, clone this repo:
```
git clone https://github.com/solarsailorneo/eventDetectorNFT.git
```
2. You will need to obtain an infura ID and etherscan key and create an `.env` file in the project directory, and place the values in the file. The flags are: `NEXT_PUBLIC_INFURA_ID` and `ETHER_SCAN_KEY` respectively.
3. Use `npm install` to install all dependencies.

## Run Locally
Use the `npm start dev` command in the project root directory.

## How to Use
Type the contract you want to track on the input box and click listen. When transfers happen, you should see a transfer tag an abbreviation of both the `from` and `to` wallets.
