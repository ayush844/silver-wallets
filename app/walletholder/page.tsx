"use client"

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { derivePath } from "ed25519-hd-key";
// import nacl from "tweetnacl";
import bs58 from "bs58"; 
import { Keypair } from "@solana/web3.js";
import MnemonicView from "@/components/MneomonicView";
import WalletList from "@/components/WalletList";

export interface Wallet {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
    path: string;
}

const page = () => {

    const [mneomonicWords, setMneomonicWords] =  useState<string[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useEffect(()=>{
        const savedMnemonic = localStorage.getItem("mnemonic");
        const savedWallets = localStorage.getItem("wallets");

        if (savedMnemonic && savedWallets) {
            setMneomonicWords(savedMnemonic.split(" "));
            setWallets(JSON.parse(savedWallets));
        }
    }, [])

    useEffect(() => {
    if (mneomonicWords.length > 0) {
        localStorage.setItem("mnemonic", mneomonicWords.join(" "));
    }
    }, [mneomonicWords]);

    useEffect(() => {
    if (wallets.length > 0) {
        localStorage.setItem("wallets", JSON.stringify(wallets));
    }
    }, [wallets]);


    const handleMneomonic = () =>{
        const mneomonic = generateMnemonic();
        console.log("Generated Mnemonic:", mneomonic);

        setMneomonicWords(mneomonic.split(" "));

        const seed = mnemonicToSeedSync(mneomonic);
        console.log("Derived Seed:", seed.toString("hex"));

    }

    const handleWalletGeneration = () => {
        if (mneomonicWords.length === 0) {
            console.error("Mnemonic not set");
            return;
        }

        const mneomonic = mneomonicWords.join(" ");

        const newWallet: Wallet | null = generateWallets("501", mneomonic, wallets.length); // Solana path type is 501'
        if (!newWallet) {
            console.error("Failed to generate wallet");
            return;
        }

        setWallets((wallets)=> [...wallets, newWallet]);
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
  <div className="min-h-screen text-white p-6 w-full  mx-auto flex flex-col">
    <h1 className="text-3xl font-bold mb-6">Solana Wallet</h1>

    {mneomonicWords.length === 0 ? (
    <button
        onClick={handleMneomonic}
        className="px-6 py-3 bg-[#FAB12F] rounded-lg border-2 border-white max-w-fit text-black font-bold hover:bg-yellow-400 transition"
    >
        GENERATE MNEMONIC
    </button>
    ) : (
    <button
        onClick={handleWalletGeneration}
        className="px-6 py-3 bg-[#FAB12F] border-2 border-white rounded-lg font-bold max-w-fit text-black hover:bg-yellow-400 transition"
    >
        GENERATE WALLET
    </button>
    )}

    {mneomonicWords.length > 0 && (
        <MnemonicView words={mneomonicWords} />
    )}

    {wallets.length > 0 && (
        <WalletList wallets={wallets} />
    )}

  </div>
  )
}

export default page