import React from 'react';
export const CentLogo = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="black" stroke="#FFD700" strokeWidth="4"/>
    <text x="50%" y="68%" textAnchor="middle" fontSize="130" fontWeight="bold" fill="#FFD700" style={{ fontFamily: 'serif' }}>C</text>
    <circle cx="150" cy="60" r="5" fill="#FFD700" />
  </svg>
);
