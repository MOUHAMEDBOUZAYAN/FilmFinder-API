import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <main className="pb-10">
          <Routes>
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;