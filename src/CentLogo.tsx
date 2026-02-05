import React from 'react';
export const CentLogo = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="black" stroke="#FFD700" strokeWidth="4"/>
    <text x="50%" y="68%" textAnchor="middle" fontSize="130" fontWeight="bold" fill="#FFD700" style={{ fontFamily: 'serif' }}>C</text>
    <path d="M150 60 Q160 40 170 60" stroke="#FFD700" fill="none" strokeWidth="3" className="animate-pulse" />
  </svg>
);
