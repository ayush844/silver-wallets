import { useEffect, useState } from "react";
import { Wallet } from "@/app/walletholder/page";

const WalletList = ({ wallets }: { wallets: Wallet[] }) => {
  // one boolean per wallet
  const [visibleKeys, setVisibleKeys] = useState<boolean[]>(
    wallets.map(() => false)
  );

//   useEffect(() => {
//     setVisibleKeys(wallets.map(() => false));
//     }, [wallets.length]);


  const toggleKey = (index: number) => {
    setVisibleKeys(prev =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {wallets.map((wallet, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg bg-gray-900 flex flex-col gap-3"
        >
          <h2 className="text-lg font-semibold">
            Wallet {i + 1}
          </h2>

          {/* Public Key */}
          <div>
            <p className="text-sm text-gray-400">Public Key</p>
            <p className="truncate text-sm">{wallet.publicKey}</p>
            <button
              onClick={() =>
                navigator.clipboard.writeText(wallet.publicKey)
              }
              className="text-purple-400 text-xs mt-1"
            >
              Copy
            </button>
          </div>

          {/* Private Key */}
          <div>
            <p className="text-sm text-gray-400">Private Key</p>

            <p className="truncate text-sm text-wrap wrap-break-word">
              {visibleKeys[i]
                ? wallet.privateKey
                : "•".repeat(32)}
            </p>

            <button
              onClick={() => toggleKey(i)}
              className="text-red-400 text-xs mt-1"
            >
              {visibleKeys[i] ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletList;
