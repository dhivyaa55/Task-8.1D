
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostPage from './components/PostPage';
import FindQuestions from './components/FindQuestions';
import QuestionForm from './components/QuestionForm'; 
import ArticleForm from './components/ArticleForm'; 

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/post">Post</Link> | <Link to="/find-questions">Find Questions</Link> | <Link to="/question-form">Question Form</Link> | <Link to="/article-form">Article Form</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/find-questions" element={<FindQuestions />} />
          <Route path="/question-form" element={<QuestionForm />} /> 
          <Route path="/article-form" element={<ArticleForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

const HomePage = () => <h1>Welcome to the Q&A App</h1>;

export default App;
