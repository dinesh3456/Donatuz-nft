import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Home from "./components/Home";
import Participate from "./components/Participate";
import Final from "./components/Final";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <Router>
          <div className="relative min-h-screen bg-[#0f101f] text-white overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f101f] via-transparent to-[#0f101f] opacity-70"></div>
            <div className="absolute -top-1/4 -left-1/4 w-3/5 h-3/5 rounded-full bg-[#3b3f8c] blur-[100px] opacity-45"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-3/5 h-3/5 rounded-full bg-[#3b3f8c] blur-[100px] opacity-45"></div>

            {/* Content */}
            <div className="relative z-10 min-h-screen">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/participate" element={<Participate />} />
                <Route path="/final" element={<Final />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default App;
