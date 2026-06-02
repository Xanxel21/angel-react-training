import React, { useState } from 'react';

interface CoverProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Cover: React.FC<CoverProps> = ({ title, description, imageUrl }) => {
  const [buttonColor, setButtonColor] = useState('blue');
  const handleButtonClick = () => {
    setButtonColor(prevColor => (prevColor === 'blue' ? 'red' : 'blue'));
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={handleButtonClick}
      >
        Cambia el color
      </button>
    </div>
  );
}

export default Cover;
