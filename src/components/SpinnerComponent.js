import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner" style={spinnerStyle}></div>
  );
};

const spinnerStyle = {
  width: '24px',
  height: '24px',
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const spinnerAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SpinnerStyles = () => (
  <style>
    {spinnerAnimation}
  </style>
);

const SpinnerComponent = () => (
  <>
    <SpinnerStyles />
    <Spinner />
  </>
);

export default SpinnerComponent;
