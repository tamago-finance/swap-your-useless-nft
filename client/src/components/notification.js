import { Container, Alert } from "reactstrap"
import styled from "styled-components";


// const Notification = () => {
//     return (
//         <Container>
//             <Alert
//                 color="primary"
//             >
//                 The campaign is live on Polygon for specific period 
//             </Alert>
//         </Container>
//     )
// }

const Notification = styled(
    ({className}) => {
        return (
            <Container className={className}>
                <Alert color="primary">
                    This dapp aims to run for a short period and will be unaudited until the end of product life, please use at your own risk and know what you gonna use it for. Follow our <a href="https://twitter.com/TamagoFinance" target="_blank">Twitter</a> for further updates. 
                </Alert>
            </Container>
        )
    })`
    
    .alert {
        padding: 5px 20px 5px 20px;
        letter-spacing: -0.3px;

        >a {
            color: inherit;
            :hover {
                text-decoration: none;
            }
        }

    }

    `

export default Notification