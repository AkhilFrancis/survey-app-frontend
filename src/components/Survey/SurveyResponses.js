import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurveyResponses } from '../../services/api';

const SurveyResponses = () => {
  const { id } = useParams();
  const [responsesData, setResponsesData] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetchSurveyResponses(id);
        setResponsesData(response.data);
      } catch (error) {
        console.error('Failed to fetch responses:', error);
      }
    };

    fetchResponses();
  }, [id]);

  if (!responsesData) {
    return <div>Loading...</div>;
  }

  const groupResponsesByQuestion = (responseDetails) => {
    const groupedResponses = {};
    responseDetails.forEach((detail) => {
      if (!groupedResponses[detail.questionId]) {
        groupedResponses[detail.questionId] = {
          questionText: detail.questionText,
          selectedOptionIds: [],
          selectedOptions: [],
          freeFormAnswer: detail.freeFormAnswer,
        };
      }
      if (detail.selectedOption) {
        groupedResponses[detail.questionId].selectedOptionIds.push(
          detail.selectedOption.id
        );
        groupedResponses[detail.questionId].selectedOptions.push(
          detail.selectedOption.text
        );
      }
    });
    return groupedResponses;
  };

  return (
    <div>
      <h1>Responses for {responsesData.survey.title}</h1>
      {responsesData.responses.map((versionResponse, index) => (
        <div key={index}>
          <h2>Version {versionResponse.version.version}</h2>
          {versionResponse.responses.map((response, idx) => {
            const groupedResponses = groupResponsesByQuestion(response.responseDetails);
            return (
              <div key={idx}>
                <h3>Response by {response.user.name}</h3>
                <ul>
                  {Object.keys(groupedResponses).map((questionId, detailIdx) => {
                    const detail = groupedResponses[questionId];
                    return (
                      <li key={detailIdx}>
                        <p>Question: {detail.questionText}</p>
                        {detail.freeFormAnswer ? (
                          <p>Answer: {detail.freeFormAnswer}</p>
                        ) : (
                          <p>Selected Options: {detail.selectedOptions.join(', ')}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SurveyResponses;
