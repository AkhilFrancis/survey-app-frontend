import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { fetchSurveys } from '../../services/api';
import { FaEdit, FaEye, FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './css/Surveys.css'; // Importing the CSS file for Surveys styling

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const response = await fetchSurveys();
        setSurveys(response.data);
      } catch (error) {
        console.error('Failed to fetch surveys:', error);
      }
    };

    getSurveys();
  }, [user]);

  return (
    <div className="surveys-container">
      <h1>All Surveys</h1>
      {user && user.isAdmin && (
        <div className="create-survey-container">
          <Link to="/create-survey" className="create-survey-btn">
            <FaPlus /> Create New Survey
          </Link>
        </div>
      )}
      <ul className="survey-list">
        {surveys.map((survey) => (
          <li key={survey.id} className="survey-item">
            <div className="survey-title">
              <Link to={`/survey/${survey.id}`} className="survey-link">
                {survey.title}
              </Link>
            </div>
            <div className="survey-status">
              {survey.completed !== undefined && (
                <span className={`status ${survey.completed ? 'completed' : 'pending'}`}>
                  {survey.completed ? <FaCheckCircle /> : <FaTimesCircle />} {survey.completed ? 'Completed' : 'Pending'}
                </span>
              )}
            </div>
            {user && user.isAdmin && (
              <div className="admin-actions">
                <Link to={`/edit-survey/${survey.id}`} className="edit-link">
                  <FaEdit /> Edit
                </Link>
                <Link to={`/survey/${survey.id}/responses`} className="view-responses-link">
                  <FaEye /> View Responses
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Surveys;
