import { Container, Col, Row, Button } from "reactstrap";
import styled from "styled-components";
import illust from "../images/img1.png";

const Jumbotron = () => {
  return (
    <>
      <Container>
        <Row md="2" xs="1">
          <Col>
            <div>
              <h2>
                Get Your <span style={{ color: "red" }}>FREE!! </span> Ang Pow
              </h2>
              <h3>Red Packet by Trashing Junk NFT</h3>
            </div>
            <Content>
              <ButtonContainer>
                <Button
                  cssModule={{ margin: "0 1rem" }}
                  color="warning"
                  size="lg"
                  outline
                >
                  Trash
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button color="info" size="lg" outline>
                  Vote
                </Button>
              </ButtonContainer>
            </Content>
          </Col>
          <Col>
            <Content>
              <img src={illust} alt="Angpow" />
            </Content>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ButtonContainer = styled.div`
  padding: 2rem 2rem 2rem 0;
`;

const Content = styled.div`
  display: flex;

  img {
    width: auto;
    position: absolute;
    right: 0px;
  }
`;

export default Jumbotron;
