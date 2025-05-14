import React from 'react';

const KPICards = ({ totalShips, totalComponents, totalJobs }) => {
  return (
    <div
      className="kpi-cards"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '20px',
        padding: '20px',
        flexWrap: 'wrap',
        marginTop: '20px', 
      }}
    >
      <div
        className="kpi-card"
        style={{
          background: 'linear-gradient(to right, #a5d6a7, #66bb6a)', 
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '250px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '18px' }}>Total Ships</h3>
        <p style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>{totalShips}</p>
      </div>
      <div
        className="kpi-card"
        style={{
          background: 'linear-gradient(to right, #ffe082, #ffb74d)', 
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '250px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '18px' }}>Total Components</h3>
        <p style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>{totalComponents}</p>
      </div>
      <div
        className="kpi-card"
        style={{
          background: 'linear-gradient(to right, #80deea, #26c6da)', 
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '250px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#ffffff', fontSize: '18px' }}>Total Jobs</h3>
        <p style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>{totalJobs}</p>
      </div>
    </div>
  );
};

export default KPICards;
