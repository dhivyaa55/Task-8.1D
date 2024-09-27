import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore'; 
import { Container, Card, Button, Dropdown, Input } from 'semantic-ui-react';

const FindQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null); 

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, 'questions'), orderBy('timestamp', 'desc')); 
      const snapshot = await getDocs(q);
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
    await deleteDoc(doc(db, 'questions', id)); 
    setQuestions(questions.filter(question => question.id !== id));
    setFilteredQuestions(filteredQuestions.filter(question => question.id !== id));
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
      setFilteredQuestions(questions.filter(q => new Date(q.timestamp.seconds * 1000).toLocaleDateString().includes(filterValue)));
    } else if (filter === 'tag') {
      setFilteredQuestions(questions.filter(q => q.tags.includes(filterValue)));
    }
  };

  const toggleExpanded = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
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
          { key: 'tag', text: 'Tag', value: 'tag' },
        ]}
        onChange={handleFilterChange}
      />
      <Input placeholder="Enter filter value" onChange={handleFilterValueChange} />
      <Button onClick={handleFilter}>Filter</Button>
      <Card.Group>
        {filteredQuestions.map((question) => (
          <Card key={question.id} onClick={() => toggleExpanded(question.id)}>
            <Card.Content>
              <Card.Header>{question.title}</Card.Header>
              <Card.Meta>{new Date(question.timestamp.seconds * 1000).toLocaleDateString()}</Card.Meta>
              {expandedQuestion === question.id && (
                <Card.Description>{question.description}</Card.Description>
              )}
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
