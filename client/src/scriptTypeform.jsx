import React, { useEffect } from 'react';

const ScriptTypeform = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div data-tf-live="01J080WY65F2EKSCV4RP6CA4WD"></div>
    </div>
  );
};

export default ScriptTypeform;
