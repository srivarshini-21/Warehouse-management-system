
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import WarehouseSystem from './WarehouseSystem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/warehouse" element={<WarehouseSystem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;