import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Home from "./components/Home";
import Participate from "./components/Participate";
import Final from "./components/Final";
import "./styles/global.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <Router>
          <div className="gradient-bg"></div>
          <div
            className="app content-wrapper"
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/participate" element={<Participate />} />
                <Route path="/final" element={<Final />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default App;
