import { Container, Col, Row, Button, Modal } from "reactstrap";
import styled from "styled-components";
import illust from "../images/img1.png";

/******************
 Styled-components
 ******************/
const ButtonContainer = styled.div`
  padding: 1rem 2rem 2rem 0;
`;
const Content = styled.div`
  display: flex;
  h3 {
    font-size: 2rem;
  }

  @media only screen and (max-width: 600px) {
    justify-content: center;
    text-align: center;
  }
`;

const ImgContent = styled.div`
  display: flex;
  overflow: visible;

  img {
  }
  @media only screen and (max-width: 900px) {
    padding-bottom: 20px;
    img {
      overflow: hidden;
    }
  }
`;

/*****
 Code
 *****/
const Jumbotron = () => {
  return (
    <>
      <Container>
        <Row md="2" xs="1">
          <Col>
            <Content>
              <div>
                <h3>
                  Get Your <span style={{ color: "red" }}>FREE!! </span> Ang Pow
                </h3>
                <h3>Red Packet by Trashing Junk NFT</h3>
              </div>
            </Content>
            <Content>
              <ButtonContainer>
                <Button color="warning" size="lg">
                  Trash
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button color="info" size="lg">
                  Vote
                </Button>
              </ButtonContainer>
            </Content>
          </Col>
          <Col>
            <ImgContent>
              <img src={illust} alt="Angpow" />
            </ImgContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Jumbotron;
