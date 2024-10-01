'use client';

import { Accordion as BootstrapAccordion } from 'react-bootstrap';
import { ReactNode } from 'react';
import SignMessage from '../components/SignMessage';
import VerifySig from "../components/VerifySignature";

interface AccordionProps {
  title: string;
  eventKey: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, eventKey, children }) => {
  return (
    <BootstrapAccordion defaultActiveKey="">
      <BootstrapAccordion.Item eventKey={eventKey}>
        <BootstrapAccordion.Header>{title}</BootstrapAccordion.Header>
        <BootstrapAccordion.Body>
          {children}
        </BootstrapAccordion.Body>
      </BootstrapAccordion.Item>
    </BootstrapAccordion>
  );
};


function App() {
  return (
    <div className="container">
      <h1>Multisig Tools</h1>

      <Accordion title="Sign message" eventKey="0">
        <SignMessage />
      </Accordion>

      <Accordion title="Verify signed message" eventKey="1">
        <VerifySig />
      </Accordion>

    </div>
  );
}

export default App;
