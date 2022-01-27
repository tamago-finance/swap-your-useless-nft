import { Container, Col, Row, Button } from "reactstrap";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <Container>
        <Row md="2">
          <Col>
            <Content>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit duis nam
                cubilia turpis aptent, auctor vel felis euismod integer
                ridiculus maecenas vehicula litora luctus nisi. Lacus duis proin
                himenaeos mauris ornare
              </p>
            </Content>
          </Col>
          <Content>
            <h3>How to get Agpow</h3>
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

const Content = styled.div`
  h3 {
    text-decoration: underline;
  }
`;

export default About;
