import BapForm from './BapForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Fill() {
  return <BapForm />;
}

function Render() {
  return <h1>Render Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Fill />} />
        <Route path="/render" element={<Render />} />
      </Routes>
    </Router>
  );
}

export default App
