import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSurveyDetails, fetchUserSurveyResponse, submitSurveyResponse } from '../../services/api';
import './css/SurveyDetails.css'; // Importing the CSS file for SurveyDetails styling

const SurveyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveyDetails = await fetchSurveyDetails(id);
        setSurvey(surveyDetails.data);

        const userResponse = await fetchUserSurveyResponse(id);
        if (userResponse.data) {
          const prefilledResponses = {};
          userResponse.data.responseDetails.forEach(detail => {
            if (detail.freeFormAnswer !== null) {
              prefilledResponses[detail.questionId] = detail.freeFormAnswer;
            } else if (Array.isArray(detail.selectedOptionIds)) {
              prefilledResponses[detail.questionId] = detail.selectedOptionIds;
            }
          });
          setResponses(prefilledResponses);
        }
      } catch (error) {
        console.error('Failed to fetch survey details or user response:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseDetails = Object.keys(responses).map((questionId) => {
      const question = survey.version.questions.find(q => q.id === questionId);
      const responseDetail = { questionId };
      if (question.type === 'FREE_FORM') {
        responseDetail.freeFormAnswer = responses[questionId];
        responseDetail.selectedOptionIds = [];
      } else if (question.type === 'MULTI_SELECT') {
        responseDetail.selectedOptionIds = responses[questionId];
        responseDetail.freeFormAnswer = null;
      } else {
        responseDetail.selectedOptionIds = [responses[questionId]];
        responseDetail.freeFormAnswer = null;
      }
      return responseDetail;
    });
    await submitSurveyResponse(id, { responseDetails });
    navigate('/surveys');
  };

  const handleBack = () => {
    navigate('/surveys');
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="survey-details">
      <form onSubmit={handleSubmit} className="survey-form">
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>
        {survey.version.questions.map((question) => (
          <div key={question.id} className="question-block">
            <p>{question.text}</p>
            {question.type === 'SINGLE_SELECT' &&
              question.options.map((option) => (
                <label key={option.id} className="option-label">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={responses[question.id]?.includes(option.id)}
                    onChange={() => handleInputChange(question.id, option.id)}
                  />
                  {option.text}
                </label>
              ))}
            {question.type === 'MULTI_SELECT' &&
              question.options.map((option) => (
                <label key={option.id} className="option-label">
                  <input
                    type="checkbox"
                    name={question.id}
                    value={option.id}
                    checked={(responses[question.id] || []).includes(option.id)}
                    onChange={(e) => {
                      const valueArray = responses[question.id] || [];
                      if (e.target.checked) {
                        handleInputChange(question.id, [...valueArray, option.id]);
                      } else {
                        handleInputChange(
                          question.id,
                          valueArray.filter((val) => val !== option.id),
                        );
                      }
                    }}
                  />
                  {option.text}
                </label>
              ))}
            {question.type === 'FREE_FORM' && (
              <textarea
                name={question.id}
                value={responses[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="free-form-textarea"
              ></textarea>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <button onClick={handleBack} className="back-button">Back to All Surveys</button>
    </div>
  );
};

export default SurveyDetails;
