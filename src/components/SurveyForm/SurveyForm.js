import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSurvey, fetchSurveyVersion, editSurvey } from '../../services/api';
import './SurveyForm.css';

const SurveyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({ title: '', description: '', questions: [] });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchSurveyVersion(id)
        .then(response => {
          const { title, description, version } = response.data;
          const formattedSurvey = {
            title,
            description,
            questions: version.questions.map(q => ({
              ...q,
              options: q.options || [] // Ensure options array is defined
            }))
          };
          setSurvey(formattedSurvey);
        })
        .catch(error => console.error('Error fetching survey version:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = survey.questions.map((question, i) => 
      i === index ? { ...question, [name]: value } : question
    );
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = survey.questions.map((question, i) => {
      if (i === qIndex) {
        const updatedOptions = question.options.map((option, j) => 
          j === oIndex ? { ...option, [name]: value } : option
        );
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setSurvey({ 
      ...survey, 
      questions: [...survey.questions, { text: '', type: 'SINGLE_SELECT', sequenceNumber: survey.questions.length + 1, options: [{ text: '', sequenceNumber: 1 }] }]
    });
  };

  const addOption = (index) => {
    const updatedQuestions = survey.questions.map((question, i) => 
      i === index ? { ...question, options: [...question.options, { text: '', sequenceNumber: question.options.length + 1 }] } : question
    );
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = survey.questions.filter((_, i) => i !== index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const deleteOption = (qIndex, oIndex) => {
    const updatedQuestions = survey.questions.map((question, i) => {
      if (i === qIndex) {
        const updatedOptions = question.options.filter((_, j) => j !== oIndex);
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...survey,
      questions: survey.questions.map((question, index) => ({
        ...question,
        sequenceNumber: index + 1,
        options: question.type !== 'FREE_FORM' ? question.options.map((option, idx) => ({ ...option, sequenceNumber: idx + 1 })) : [],
      }))
    };
    if (isEdit) {
      editSurvey(id, payload)
        .then(() => navigate('/surveys'))
        .catch(error => console.error('Error editing survey:', error));
    } else {
      createSurvey(payload)
        .then(() => navigate('/surveys'))
        .catch(error => console.error('Error creating survey:', error));
    }
  };

  return (
    <div className="survey-form">
      <h2>{isEdit ? 'Edit Survey' : 'Create Survey'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={survey.title} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={survey.description} onChange={handleInputChange} required />
        </div>
        {survey.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block">
            <label>Question {qIndex + 1}</label>
            <input type="text" name="text" value={question.text} onChange={(e) => handleQuestionChange(qIndex, e)} required />
            <select name="type" value={question.type} onChange={(e) => handleQuestionChange(qIndex, e)}>
              <option value="SINGLE_SELECT">Single Select</option>
              <option value="MULTI_SELECT">Multi Select</option>
              <option value="FREE_FORM">Free Form</option>
            </select>
            {question.type !== 'FREE_FORM' && question.options.map((option, oIndex) => (
              <div key={oIndex} className="option-block">
                <label>Option {oIndex + 1}</label>
                <input type="text" name="text" value={option.text} onChange={(e) => handleOptionChange(qIndex, oIndex, e)} required />
                <button type="button" onClick={() => deleteOption(qIndex, oIndex)}>Delete Option</button>
              </div>
            ))}
            {question.type !== 'FREE_FORM' && (
              <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
            )}
            <button type="button" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">{isEdit ? 'Update Survey' : 'Create Survey'}</button>
      </form>
    </div>
  );
};

export default SurveyForm;
