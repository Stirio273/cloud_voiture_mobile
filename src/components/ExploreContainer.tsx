import React from 'react';
import '../styles/ExploreContainer.css';

interface ContainerProps {
  children: React.ReactNode;
}

const ExploreContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default ExploreContainer;
