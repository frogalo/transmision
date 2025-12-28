import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-top: 40px;
  background-color: #0a101c; /* matches background */
  color: #9f9f9f;
  font-size: 0.9rem;
  font-family: 'Glegoo', serif;
  border-top: 1px solid #2a3b55;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Jakub Urbanski 2025</p>
        </FooterContainer>
    );
};

export default Footer;
