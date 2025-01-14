import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Jakub Urbanski 2025</p>
        </FooterContainer>
    );
};

export default Footer;
