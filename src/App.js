import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Surveys from './components/Survey/Surveys';
import SurveyDetails from './components/Survey/SurveyDetails';
import CreateEditSurvey from './components/Survey/CreateEditSurvey';
import SurveyResponses from './components/Survey/SurveyResponses';
import Home from './components/Home/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/survey/:id" element={<SurveyDetails />} />
          <Route path="/create-survey" element={<CreateEditSurvey />} />
          <Route path="/edit-survey/:id" element={<CreateEditSurvey />} />
          <Route path="/survey/:id/responses" element={<SurveyResponses />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
