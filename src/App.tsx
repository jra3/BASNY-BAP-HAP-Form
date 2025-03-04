import BapForm from './BapForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from './FormContext';
import PrintPage from './Render';

// Injected from vite.config.ts
const basename = import.meta.env.BASE_URL;

function Fill() {
  return <BapForm />;
}

function Render() {
  return <PrintPage />;
}

function App() {
  return (
    <FormProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Fill />} />
          <Route path="/render" element={<Render />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App
