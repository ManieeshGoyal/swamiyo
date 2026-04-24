import "@/App.css";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import PolicyPage from "@/components/PolicyPage";
import ThankyouPage from "@/components/ThankyouPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thankyou" element={<ThankyouPage />} />
          <Route path="/thank-you" element={<ThankyouPage />} />
          <Route path="/privacy-policy" element={<PolicyPage slug="privacy-policy" />} />
          <Route path="/terms-conditions" element={<PolicyPage slug="terms-conditions" />} />
          <Route path="/refund-policy" element={<PolicyPage slug="refund-policy" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
