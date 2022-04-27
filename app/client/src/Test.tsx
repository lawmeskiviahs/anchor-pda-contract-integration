

import { Provider, web3 } from "@project-serum/anchor";
import { useLocalStorage, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey, TransactionInstruction ,SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import { Button } from "antd";
import React, { useState } from "react";
import { Borsh, Account, AnyPublicKey, StringPublicKey } from '@metaplex-foundation/mpl-core';
import BN from 'bn.js';
import { deserializeUnchecked, serialize } from 'borsh';
import {
  CreateMasterEditionV3Args,
  CreateMetadataV2Args,
  DataV2,
  UpdateMetadataV2Args,
  MetadataData,
} from '@metaplex-foundation/mpl-token-metadata';

import * as Metaplex from '@metaplex/js';
import { sendAndConfirmTransaction } from "@solana/web3.js";
import { ClientRequest } from "http";
import {
  Program
} from '@project-serum/anchor';
import idl from './Idl.json';




const Test=()=> {

    const { SystemProgram, Keypair } = web3;
    /* create an account  */
    const baseAccount = Keypair.generate();
    console.log(baseAccount,">>>>>>>>");
    
    const opts = {
      preflightCommitment: "processed"
    }
  
    async function getProvider() {
      /* create the provider and return it to the caller */
      /* network set to local network for now */
      // const network = "http://127.0.0.1:8899";
      const network = " https://api.devnet.solana.com";
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new  Provider(
        connection, wallet, opts.preflightCommitment,
      );
      return provider;
    }
    const [value, setValue] = useState(null);
    const wallet = useWallet();
  console.log(wallet,"??????????????????????");

 



const deposit =async()=>{
  const provider = await getProvider()
  const programId = new PublicKey("A6FhyRRxA6VsrH5yr4jAgPk9t4dGHEynW3D7woqT5qAe")

  const program = new Program( idl , programId , provider );

  const [baseAccountPDA, baseAccountPDABump] = await web3.PublicKey.findProgramAddress(
    [Buffer.from("uvuvyuyi")],
    programId
  );

  await program.rpc.initialize(baseAccountPDABump,   {
    accounts: {
      baseAccount: baseAccountPDA,
      creator: program.provider.wallet.publicKey,
      systemProgram:web3.SystemProgram.programId,
    },
    signers: [],
  });
  
  




}
    if (!wallet.connected) {
      /* If the user's wallet is not connected, display connect wallet button. */
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
          <WalletMultiButton />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div> 
        
  
            <><Button onClick={deposit} > DEPOSIT</Button></>
         
  
          </div>
        </div>
      );
    }
  
  
  
  }
  export default Test