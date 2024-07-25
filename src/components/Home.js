import React, { useState, useEffect } from "react";
import { ConnectButton, useActiveAccount, darkTheme } from "thirdweb/react";
import { client, accountAbstraction } from "../utils/constants";
import { ReactComponent as BackgroundWave } from "../assets/svg/background-wave.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (account) {
      navigate("/participate");
    }
  }, [account, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#1c1e3d]">
      {/* Blue glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute top-0 -left-10% w-1/3 h-1/3 bg-blue-500 opacity-20 blur-[100px]"></div>
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-400 opacity-20 blur-[100px]"></div>
        {/* Bottom-left glow */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600 opacity-15 blur-[80px]"></div>
      </div>

      {/* Background wave SVG */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundWave className="w-[150%] sm:w-[105%] h-auto max-w-none absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 translate-y-0" />
      </div>

      {/* Main content */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          Donatuz is Live!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-white">
          "Empower change with every block. Welcome to Donatuz, where
          transparency meets generosity on the blockchain."
        </p>
        <ConnectButton
          client={client}
          accountAbstraction={accountAbstraction}
          theme={darkTheme({
            colors: {
              primaryText: "#f8f8f1",
              primaryButtonBg: "#ddad27",
            },
          })}
          connectButton={{
            label: "Participate",
          }}
          connectModal={{
            title: "Connect to Participate",
            size: "wide",
            titleIcon: "",
            showThirdwebBranding: false,
          }}
        />
      </main>
    </div>
  );
}

export default Home;
