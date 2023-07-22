"use client";

import { useEffect, useState } from 'react';

export default function Foundations() {
  const [data, setData] = useState(null);

  useEffect(() => {

    fetch('/api/foundations')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item.text}</p>
      ))}
    </div>
  );
}
