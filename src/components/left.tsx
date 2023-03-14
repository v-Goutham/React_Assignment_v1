import React, { memo } from 'react';
import './dashboard.css';

interface Person {
  name: string;
  short: string;
}

interface LeftProps {
  persons: Person[];
  customer: number;
  handleClick: (index: number) => void;
}




const Left = memo(({ persons, customer, handleClick }: LeftProps) => {

 

  return (
    <div>
      {persons.map((ele, i) => {
        return (
          <div className={i === customer ? "card1" : "card"} onClick={() => handleClick(i)}>
            <h3>{ele.name}</h3>
            <p>{ele.short}</p>
          </div>
        );
      })}
    </div>
  );
});

export default Left;
