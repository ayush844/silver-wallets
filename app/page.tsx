import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-indigo-950 via-slate-950 to-black">
      
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2
          h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3
          h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-xl text-center space-y-10">
        
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight
            bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Silver Wallet
          </h1>
          <p className="text-slate-400 text-base">
            A minimal, read-only crypto wallet to generate keys and view balances.
          </p>
        </div>

        {/* Feature Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
          rounded-2xl p-6 text-left space-y-3 shadow-xl">
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Generate a secure seed phrase</li>
            <li>• Create Solana (and Ethereum) wallets</li>
            <li>• View SOL & token balances</li>
            <li>• No private keys leave your browser</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-10 text-base font-medium
              bg-gradient-to-r from-indigo-500 to-cyan-500
              hover:from-indigo-400 hover:to-cyan-400
              shadow-lg shadow-indigo-500/30">
            Get Started
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500">
          Read-only • Non-custodial • Built for learning
        </p>
      </div>
    </main>
  )
}
