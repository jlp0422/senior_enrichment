import React from 'react';

const EasterEgg = () => {
  return (
    <div className="jumbotron">
      <blockquote className="blockquote text-center">
      {/* broken link on purpose */}
      <img src="/easter-egg.png" />
      <h3>"It's a feature, not&nbsp;a&nbsp;bug."</h3>
      <footer className="blockquote-footer"><cite title="Source Title">undefined</cite></footer>
      </blockquote>
    </div>
  )
};

export default EasterEgg;
