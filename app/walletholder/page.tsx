"use client"

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58"; 
import { Keypair } from "@solana/web3.js";

interface Wallet {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    path: string;
}

const page = () => {

    const [mneomonicWords, setMneomonicWords] =  useState<string[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);

useEffect(()=>{
    handleMneomonic();
}, [])

const handleMneomonic = () =>{
    const mneomonic = generateMnemonic();
    console.log("Generated Mnemonic:", mneomonic);

    setMneomonicWords(mneomonic.split(" "));

    const seed = mnemonicToSeedSync(mneomonic);
    console.log("Derived Seed:", seed.toString("hex"));

    const myWallet: Wallet | null = generateWallets("501", mneomonic, 0); // Solana path type is 501'


}

const generateWallets = (pathType: string, mnemonic: string, accountIndex: number): Wallet | null => {
    try {

        // pathtype: 501' for solana, 60' for ethereum
        const seed = mnemonicToSeedSync(mnemonic);

        const path = `m/44'/${pathType}'/0'/${accountIndex}'`;

        const {key: derivedSeed} = derivePath(path, seed.toString("hex"));

        console.log("Derived Seed for path", path, ":", derivedSeed.toString("hex"));

        let publicKeyEncoded: string;
        let privateKeyEncoded: string;

        if (pathType === "501") {
            const keypair = Keypair.fromSeed(derivedSeed);

            publicKeyEncoded = keypair.publicKey.toBase58();
            privateKeyEncoded = bs58.encode(keypair.secretKey);

            console.log("Solana Public Key:", publicKeyEncoded);
            console.log("Solana Private Key:", privateKeyEncoded);
        } else {
            return null;
        }

        return {
            publicKey: publicKeyEncoded,
            privateKey: privateKeyEncoded,
            mnemonic: mnemonic,
            path: path
        }

    } catch (error) {
        return null;
    }
}

  return (
    <div className=" text-white text-lg font-bold">
        This is a wallet holder
    </div>
  )
}

export default page