import { Transaction, ForgeScript } from '@meshsdk/core';
import type { Mint, AssetMetadata } from '@meshsdk/core';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from 'react';

// prepare forgingScript

function Sign() {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');


  const handleSubmit = async (event) => {
    if (wallet) {
      console.log(input1, input2, input3);
      const usedAddress = await wallet.getUsedAddresses();
      console.log(usedAddress);
      const address = usedAddress[0];
      const forgingScript = ForgeScript.withOneSignature(address);
      event.preventDefault();
      const tx = new Transaction({ initiator: wallet });

      // define asset#1 metadata
      const assetMetadata1: AssetMetadata = {
        name: input1,
        image: input2,
        mediaType: 'image/jpg',
        description: input3
      };
      const asset1: Mint = {
        assetName: input1,
        assetQuantity: '1',
        metadata: assetMetadata1,
        label: '721',
        recipient:
          input4,
      };
      tx.mintAsset(forgingScript, asset1);

      const assetMetadata2: AssetMetadata = {
        name: input1,
        image: input2,
        mediaType: 'image/jpg',
        description: input3
      };
      const asset2: Mint = {
        assetName: "madebyhieptran2",
        assetQuantity: '1',
        metadata: assetMetadata2,
        label: '721',
        recipient:
          "addr_test1qr4fkykkejglg6fz7vydddvwezc4vr4rpecp8nc5psc27zhcq7w00py4yvvu390jd40vzj646ra9c809xpwcnqwawg4q0xgwj3",
      };

      tx.mintAsset(forgingScript, asset2);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log(txHash);
    }
  };

  return (
    <>
      <CardanoWallet />
      {connected && (
        <>
          <h1>Get Wallet Assets</h1>
          {assets ? (
            <pre>
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          ) : (
            <div>
                <div>
                  <label htmlFor="input1">Nhap ten</label>
                  <input
                    id="input1"
                    type="text"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="input2">Nhap anh</label>
                  <input
                    id="input2"
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="input3">Nhap mo ta</label>
                  <input
                    id="input3"
                    type="text"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="input4">Địa chỉ người nhận</label>
                  <input
                    id="input4"
                    type="text"
                    value={input4}
                    onChange={(e) => setInput4(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Sign;
