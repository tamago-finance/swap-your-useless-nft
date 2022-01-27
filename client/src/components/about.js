import { Container, Col, Row, Button } from "reactstrap";
import styled from "styled-components";

/******************
 Styled-components
 ******************/
const Content = styled.div`
  font-size: 1.5rem;
  h3 {
    text-decoration: underline;
    color: #ecdbba;
    font-size: 2rem;
  }
  p {
    padding: 5% 0;
  }
`;

/*****
 Code
 *****/
const About = () => {
  return (
    <>
      <Container>
        <Row md="2">
          <Col>
            <Content>
              <p>
                Vote your favorite worthless NFT asset address on Polygon and
                Ethereum Mainnet on following Google Form, once reached
                significantly votes we will add it into whitelist.
              </p>
            </Content>
          </Col>
          <Content>
            <h3>How to get Ang Pow</h3>
            <ol>
              <li>
                Lorem ipsum dolor sit amet consectetur adipiscing elit duis nam
                cubilia{" "}
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipiscing elit duis nam
                cubilia{" "}
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipiscing elit duis nam
                cubilia{" "}
              </li>
            </ol>
          </Content>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
