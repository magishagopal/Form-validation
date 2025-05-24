import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Success from './components/Success';

const App = () => (
  <Routes>
    <Route path="/" element={<Form />} />
    <Route path="/success" element={<Success />} />
  </Routes>
);

export default App;
