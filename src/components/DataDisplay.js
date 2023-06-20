import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore collection
    firestore.collection('knowledge').onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>Name: {item.name}</h3>
          <p>Experience: {item.experience}</p>
          <p>Knowledge: {item.knowledge}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
