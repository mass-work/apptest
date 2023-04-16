import ChatGPTTempCreate from './00_app/00_formatter/ChatGPTTempCreate';
import styled from "styled-components";

function App() {
  return (
    <div>
      <ChatGPTTempCreate />
      <FooterContainer>
        <CopyrightContainer>
          Copyright © 2023 mass
        </CopyrightContainer>
      </FooterContainer>
    </div>
  );
}

export default App;

const FooterContainer = styled.footer`
background-color: rgb(60, 60, 60);
  margin: 0% 00% -100% 0%;
  padding: 0% 00% 100% 0%;
`
const CopyrightContainer = styled.div`
  text-align: center;
`
