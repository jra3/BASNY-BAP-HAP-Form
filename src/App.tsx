import BapForm from './BapForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from './FormContext';
import PrintPage from './Render';

function Fill() {
  return <BapForm />;
}

function Render() {
  return <PrintPage />;
}

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Fill />} />
          <Route path="/render" element={<Render />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App
