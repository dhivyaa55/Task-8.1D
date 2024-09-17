import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { Container, Card, Button, Dropdown, Input } from 'semantic-ui-react';

const FindQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const snapshot = await db.collection('questions').orderBy('timestamp', 'desc').get();
      const fetchedQuestions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(fetchedQuestions);
      setFilteredQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    await db.collection('questions').doc(id).delete();
    setQuestions(questions.filter(question => question.id !== id));
  };

  const handleFilterChange = (e, { value }) => {
    setFilter(value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilter = () => {
    if (filter === 'title') {
      setFilteredQuestions(questions.filter(q => q.title.includes(filterValue)));
    } else if (filter === 'date') {
      setFilteredQuestions(questions.filter(q => q.timestamp.includes(filterValue)));
    }
  };

  return (
    <Container>
      <h1>Find Questions</h1>
      <Dropdown
        placeholder='Filter By'
        selection
        options={[
          { key: 'title', text: 'Title', value: 'title' },
          { key: 'date', text: 'Date', value: 'date' },
        ]}
        onChange={handleFilterChange}
      />
      <Input placeholder="Enter filter value" onChange={handleFilterValueChange} />
      <Button onClick={handleFilter}>Filter</Button>
      <Card.Group>
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <Card.Content>
              <Card.Header>{question.title}</Card.Header>
              <Card.Meta>{new Date(question.timestamp.seconds * 1000).toLocaleDateString()}</Card.Meta>
              <Card.Description>{question.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color="red" onClick={() => handleDelete(question.id)}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default FindQuestions;
