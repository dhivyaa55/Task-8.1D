import React from 'react';
import { Form } from 'semantic-ui-react';

const QuestionForm = () => (
  <Form.Field>
    <label>Question Title</label>
    <input placeholder='Enter your question title' />
    <label>Details</label>
    <textarea placeholder='Provide more details about your question' />
  </Form.Field>
);

export default QuestionForm;
