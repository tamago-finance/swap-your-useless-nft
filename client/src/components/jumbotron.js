import { Container, Col, Row, Button } from "reactstrap";
import styled from "styled-components";
import illustPng from "../images/illustration-1.png";
import { useState } from "react";
import useInterval from "../hooks/useInterval"

import ClaimModal from "./modals/ClaimModal";

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

const ContentPane = styled.div`
  border-radius: 20px;
  height: 100%; 
  border: 1px solid white; 
          
  display: flex;

  h1 {
    font-size: 60px;
    line-height: 60px;
    ${ props => props.flash && "text-decoration: underline;"}
    margin-bottom: 20px;
  }

  h3 {
    line-height: 28px;
  }

  div {
      margin-top: auto;
      margin-bottom: auto;
      padding: 20px;
      font-size: 20px;
      line-height: 22px;

      a {
          color :inherit;
      }

  }

  @media only screen and (max-width: 600px) {
      div {
          font-size: 18px;
          line-height: 18px;
      }

      margin-bottom: 20px;

  }
`

const ImgContent = styled.div`
  display: flex;
  overflow: visible; 

  img {
  }
  @media only screen and (max-width: 600px) {
    padding-bottom: 20px;
    img {
      overflow: hidden;
    }
  }
`;

const IllustrationPane = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`

const IllustrationBox1 = styled.div`
  position: absolute;
  top: 60px;
  left: 25%; 
  width: 300px;
  border-radius: 20px; 
  overflow: hidden;
  z-index: 100;
`

const IllustrationBox2 = styled.div`
  position: absolute;
  top: 40px;
  left: 10%; 
  width: 250px;
  height: 250px;
  border-radius: 20px; 
  background: linear-gradient(45deg,#db36a4, #f7ff00);
`

const IllustrationBox3 = styled.div`
  position: absolute;
  top: 200px;
  right: 10%; 
  width: 200px;
  height: 200px;
  border-radius: 20px; 
  background: linear-gradient(45deg, #4A00E0, #8E2DE2 );
`

const Illustration = styled.img.attrs( () => ({ src : illustPng , alt : "illustration" }))`
  width: 100%; 
  margin: auto; 

`

/*****
 Code
 *****/
const Jumbotron = () => {
  const [claimVisible, setClaimVisible] = useState(false);
  const toggleClaimModal = () => {
    setClaimVisible(!claimVisible);
  };

  const [flash, setFlash ] = useState(false)

  useInterval(() => {

    setFlash(!flash)

  },1000)

  return (
    <>
      <Container>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Col sm="6">
            {/* <Content>
              <div>
                <h3>
                  Get Your <span style={{ color: "red" }}>FREE!! </span> Ang Pow
                </h3>
                <h3>Red Packet by Trashing Junk NFT</h3>
              </div>
            </Content>
            <ClaimModal
              toggleClaimModal={toggleClaimModal}
              claimVisible={claimVisible}
            />
            <Content>
              <ButtonContainer>
                <Button color="warning" size="lg" onClick={toggleClaimModal}>
                  Trash
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button color="info" size="lg">
                  Vote
                </Button>
              </ButtonContainer>
            </Content> */}
            <ContentPane flash={flash}>
            <div>
                {/* <h3>
                  Get Your <span style={{ color: "red" }}>FREE!! </span> Ang Pow
                </h3>
                <h3>Red Packet by Trashing Junk NFT</h3> */}
                <h1>Clean NFT Ecosystem Up By Your Hands</h1>
                <h3>By vote and dump your priceless NFT, each dump will be awarded with NFT worth of $1 and up to $100 if completed the mission.</h3>
              </div>
            </ContentPane>
          </Col>
          <Col sm="6">
            {/* <ImgContent>
              <Illustration/>
            </ImgContent> */}

            <IllustrationPane>
              <IllustrationBox1>
                <Illustration/>
              </IllustrationBox1>
              <IllustrationBox2/>
              <IllustrationBox3/>
            </IllustrationPane>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Jumbotron;
