import "./App.css";
import { ClaimList, CreateClaim } from "./pages";
import { WelcomeModal } from "./components";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <h1>Claim System</h1>
      <BrowserRouter>
        <WelcomeModal />
        <Routes>
          <Route index element={<ClaimList />} />
          <Route path="create-claim" element={<CreateClaim />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
