import { useEffect, useState } from "react";
// import type { NextPage } from "next";
import { useAccount, useBalance, useContract, useProvider, useContractEvent } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import abi from "../abi.json";
import { ethers } from "ethers";
// import TextField from "@mui/material/TextField";


// const CONTRACT_ADDR = '0xbeB1d3357cD525947b16A9f7a2b3d50B50b977BD'; // Huxley Robots
const CONTRACT_ADDR = '0x23581767a106ae21c074b2276D25e5C3e136a68b'; // Moonbirds


// Use the mainnet
const network = "homestead";



// const contract = new ethers.Contract(CONTRACT_ADDR, abi)

const Home = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    watch: true,
  });

  const [txs, setTxs] = useState([]);
  const [contractAddress, setContractAddress] = useState('0x23581767a106ae21c074b2276D25e5C3e136a68b');



  const loading = (accountLoading || balanceLoading) && !balanceData;

  const provider = useProvider();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const handleTransfer = (from, to, tokenId, event) => {
    let type;
    let tx = event.transactionHash;

    if(from === ethers.constants.AddressZero) {
      type = "mint";
    }
    else {
      type = "transfer";
    }
    
    console.log({
      from,
      to,
      tokenId: tokenId.toString(),
      type,
      tx
    })

    setTxs((prev) => [
      {
        type,
        from,
        to,
        tx
      },
      ...prev
      ])
    }

  useEffect(() => {
    contract.on("Transfer", handleTransfer)

    return () => {
      contract.removeAllListeners("Transfer")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log(contractAddress);
  }

  const renderContent = () => {

    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>
        <div>
        <h1 className="mb-8 text-4xl font-bold">Event Activity of Collection</h1>
          {/* <TextField onSubmit={onSubmit}
            id="outlined-basic"
            value={contractAddress}
            fullWidth
            onChange={(e) => setContractAddress(e.target.value)}
            variant="outlined"
            label="Contract"
          /> */}
          <form onSubmit={onSubmit}>
            <input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Listen to contract"
            />
            <Button type="submit">Listen</Button>
          </form>
          
        </div>
          {/* <h1 className="mb-8 text-4xl font-bold">My Wallet</h1> */}
          {/* <div className="inline-flex place-items-center">
            <h6 className="ml-2 text-2xl">{`Ξ ${Number(
              balanceData?.formatted
            ).toFixed(4)} ${balanceData?.symbol}`}</h6>
          </div> */}
          <div>
            {/* {console.log(e)} */}
            {txs.map((log) => (
              <div key={log.tx} className="flex flex-row">
                <div className="text-xs w-16 mr-2">
                  {log.type === "mint" && (<span className="mr-2 bg-green-400 px-3">{log.type}</span>)}
                  {log.type === "transfer" && (<span className="mr-2 bg-yellow-400 px-3">{log.type}</span>)}
                </div>
                {log.type === "transfer" && (
                <div className="text-xs w-32">
                  {log.from.slice(0,2)}...{log.from.slice(38,42)} ⮕ {log.to.slice(0,2)}...{log.to.slice(38,42)}
                </div>
                )}
                {log.type === "mint" && (
                <div className="text-xs w-32">
                  {log.to.slice(0,2)}...{log.to.slice(38,42)}
                </div>
                )}
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Welcome to my transfer tracker website!
        </h1>
        <Button
          loading={accountLoading}
          onClick={() => setShowWalletOptions(true)}
        >
          Connect to Wallet 
        </Button>
      </>
    );
  };

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />-

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
