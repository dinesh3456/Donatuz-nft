import React, { useEffect, useState } from "react";
import { useActiveAccount, ConnectButton, darkTheme } from "thirdweb/react";
import { accountAbstraction, client } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/global.css";

function Home() {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (account) {
      navigate("/participate");
    }
  }, [account, navigate]);

  const handleConnect = (data) => {
    console.log("Connected:", data);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    console.log("Disconnected");
    setIsConnected(false);
  };

  return (
    <div className="home">
      <div className="home-content">
        <h1>
          The Fastest
          <br />
          Modular AI Chain
        </h1>
        <p>
          "Empower change with every block. Welcome to Donatuz, where
          transparency meets generosity on the blockchain."
        </p>
        <div className="connect-button">
          <ConnectButton
            client={client}
            accountAbstraction={accountAbstraction}
            theme={darkTheme({
              colors: {
                primaryButtonBg: "linear-gradient(to right, #666666, #222222)",
                primaryButtonText: "#ededef",
                borderColor: "rgb(67 87 108)",
              },
            })}
            connectButton={{
              label: "Participate",
            }}
            connectModal={{
              size: "compact",
              titleIcon: "",
              showThirdwebBranding: false,
            }}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onError={(error) => console.error("Connection error:", error)}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
