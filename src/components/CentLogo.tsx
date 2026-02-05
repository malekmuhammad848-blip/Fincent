import React from 'react';
const CentLogo = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="black" stroke="url(#gold)" strokeWidth="4"/>
    <text x="50%" y="68%" textAnchor="middle" fontSize="130" fontWeight="bold" fill="url(#gold)" style={{ fontFamily: 'serif' }}>C</text>
    <circle cx="150" cy="60" r="5" fill="#FFD700" className="animate-ping" />
  </svg>
);
export default CentLogo;
