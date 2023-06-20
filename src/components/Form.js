import React, { useState } from 'react';
import { firestore } from '../firebase';

const Form = () => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [knowledge, setKnowledge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add data to Firestore collection
    firestore.collection('knowledge').add({
      name,
      experience,
      knowledge,
    });

    // Clear form inputs
    setName('');
    setExperience('');
    setKnowledge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Experience"
      ></textarea>
      <textarea
        value={knowledge}
        onChange={(e) => setKnowledge(e.target.value)}
        placeholder="Knowledge"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
