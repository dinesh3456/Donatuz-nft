import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as DonatuzLogo } from "../assets/svg/donatuz.logo.svg";
import { ConnectButton } from "thirdweb/react";
import { client, accountAbstraction } from "../utils/constants";
import { darkTheme } from "thirdweb/react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "";

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-2 sm:px-4 py-2 sm:py-4">
      <div className="container mx-auto flex justify-between items-center">
        <DonatuzLogo className="h-8 w-auto" />
        {!isHomePage && (
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
        )}
      </div>
    </header>
  );
};

export default Header;
