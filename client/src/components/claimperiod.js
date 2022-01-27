import { Container, Table } from "reactstrap";
import styled from "styled-components";

const ClaimPeriod = () => {
  return (
    <>
      <Container>
        <Content>
          <h2>Claim Period</h2>
        </Content>
        <Table bordered dark hover size="sm">
          <thead>
            <tr>
              <th>Period</th>
              <th>Status</th>
              <th>Parcipitation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1/1/22 - 14/1/22</th>
              <td>Ended</td>
              <td>14 Wallets Parcipitated</td>
            </tr>
            <tr>
              <th scope="row">1/2/22 - 7/2/22</th>
              <td>Opened</td>
              <td>14 Wallets Parcipitated</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

const Content = styled.div`
  text-align: center;
  padding-top: 20px;
`;

export default ClaimPeriod;
