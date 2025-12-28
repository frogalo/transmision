import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin-top: 40px;
  background-color: #0c1118; /* matches background */
  color: #7a8ba3; /* muted text */
  font-size: 0.9rem;
  font-family: 'Glegoo', serif;
  border-top: 1px solid #30476e; /* secondary border */
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Jakub Urbanski 2025</p>
        </FooterContainer>
    );
};

export default Footer;
