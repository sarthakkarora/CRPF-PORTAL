import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Personnel from './components/Personnel';
import Chat from './components/Chat';
import Reports from './components/Reports';
import Alerts from './components/Alerts';
import IndentResource from './components/Indent';
import MissionProfile from './components/MissionProfile';
import Medical from './components/Medical'; 
import FundRequestPage from './components/FundRequestPage'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/indent" element={<IndentResource />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mission-profile" element={<MissionProfile />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/fund-request" element={<FundRequestPage />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
