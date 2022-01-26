import { Container, Col, Row, Button } from "reactstrap";

const Jumbotron = () => {
  return (
    <>
      <Container>
        <Row md="2" xs="1">
          <Col>
            <div>
              <h2>Get Your FREE Ang Pow</h2>
              <h3>Red Packet by Trashing Junk NFT</h3>
            </div>
            <div>
              <Button color="warning" size="lg" outline>
                Trash
              </Button>
              <Button color="info" size="lg" outline>
                Vote
              </Button>
            </div>
          </Col>
          <Col>illustration</Col>
        </Row>
      </Container>
    </>
  );
};

export default Jumbotron;
