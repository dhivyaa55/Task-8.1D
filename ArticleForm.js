import React from 'react';
import { Form } from 'semantic-ui-react';

const ArticleForm = () => (
  <Form.Field>
    <label>Article Title</label>
    <input placeholder='Enter your article title' />
    <label>Content</label>
    <textarea placeholder='Write your article content here' />
  </Form.Field>
);

export default ArticleForm;
