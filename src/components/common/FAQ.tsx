'use client';

import { CrossIcon, PlusIcon } from '@icons';
import { useState } from 'react';

interface FAQProps {
  question: string;
  answer: string;
}

export const FAQ = ({ question, answer }: FAQProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-container">
      <button className="faq-item" onClick={handleClick} type="button">
        <p className="faq-question">{question}</p>
        <span className="faq-icon-button">
          {isOpen ? (
            <CrossIcon className="faq-icon-cross" />
          ) : (
            <PlusIcon className="faq-icon-plus" />
          )}
        </span>
      </button>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
};
