import React, { useState } from "react";
import { Button, Card, List } from "antd";
import { useContractReader } from "eth-hooks";
import { Address, AddressInput} from "../components";

function Home({ 
  isSigner,
  loadWeb3Modal,
  yourCollectibles,
  address,
  blockExplorer,
  mainnetProvider,
  tx,
  readContracts,
  writeContracts,
}) {
  const [transferToAddresses, setTransferToAddresses] = useState({});

  return (
    <div>
      {/* Mint button */}
      <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        {isSigner?(
          <Button type={"primary"} onClick={()=>{
            tx( writeContracts.YourCollectible.mintItem() )
          }}>MINT</Button>
        ):(
          <Button type={"primary"} onClick={loadWeb3Modal}>CONNECT WALLET</Button>
        )}
      </div>
      <div style={{ width: 820, margin: "auto", paddingBottom: 256 }}>
        <List
          bordered
          dataSource={yourCollectibles}
          renderItem={item => {
            const id = item.id.toNumber();
            console.log("IMAGE",item.image)
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                <Card
                  title={
                    <div>
                      <span style={{ fontSize: 18, marginRight: 8 }}>{item.name}</span>
                    </div>
                  }
                >
                  <a href={"https://opensea.io/assets/"+(readContracts && readContracts.YourCollectible && readContracts.YourCollectible.address)+"/"+item.id} target="_blank">
                  <img src={item.image} />
                  </a>
                  <div>{item.description}</div>
                </Card>

                <div>
                  owner:{" "}
                  <Address
                    address={item.owner}
                    ensProvider={mainnetProvider}
                    blockExplorer={blockExplorer}
                    fontSize={16}
                  />
                  <AddressInput
                    ensProvider={mainnetProvider}
                    placeholder="transfer to address"
                    value={transferToAddresses[id]}
                    onChange={newValue => {
                      const update = {};
                      update[id] = newValue;
                      setTransferToAddresses({ ...transferToAddresses, ...update });
                    }}
                  />
                  <Button
                    onClick={() => {
                      console.log("writeContracts", writeContracts);
                      tx(writeContracts.YourCollectible.transferFrom(address, transferToAddresses[id], id));
                    }}
                  >
                    Transfer
                  </Button>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
      <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
        🛠 built with <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank">🏗 scaffold-eth</a>
        🍴 <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank">Fork this repo</a> and build a cool SVG NFT!
      </div>
    </div>
  );
}

export default Home;
