import { Col, Container, Row } from 'react-bootstrap';

import { FaRegCheckCircle } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { LuScanQrCode } from "react-icons/lu";
import { TbDeviceMobileDollar } from "react-icons/tb";

const HowTo = () => {
  const steps = [
    {
      id: 1,
      icon: <FaPix />,
      name: 'Pague com Pix'
    },
    {
      id: 2,
      icon: <TbDeviceMobileDollar />,
      name: 'Acesse o App do seu banco'
    },
    {
      id: 3,
      icon: <LuScanQrCode />,
      name: 'Realize pagamento com Pix'
    },
    {
      id: 4,
      icon: <FaRegCheckCircle />,
      name: 'Obtenha seu bilhete de passagem'
    }
  ]

  return (
    <section id="how-to-section" className='py-4'>
      <Container>
        <Row>
          {steps.map((step) => (
            <Col key={step.id} className="col-md-3 col-sm-12">
              <div className="d-flex align-items-center gap-3">
                <div className="step-icon flex-shrink-0 fw-bold"
                style={{ fontSize: '40px' }}>{step.icon}</div>
                <div className="step-name">{step.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowTo;
