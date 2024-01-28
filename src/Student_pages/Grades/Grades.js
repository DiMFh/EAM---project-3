import { useState } from 'react';
import { Breadcrumb, Container,} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllGradesComponent from './AllGradesComponent';
import ExamsGradesComponent from './ExamsGradesComponent';


function ControlledGrades({db}) {
  const [key, setKey] = useState('AllGrades');

  return (
    <>
            <Breadcrumb>
                <Breadcrumb.Item href="./">Αρχική</Breadcrumb.Item>
                <Breadcrumb.Item active>Βαθμολογίες</Breadcrumb.Item>
            </Breadcrumb>
                <h1 style = {{marginTop: "100px"}}>Βαθμολογίες</h1>
            <Container style={{ borderRadius: "15px", padding: '20px' }} >
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="AllGrades" title="Όλες οι εξεταστικές περίοδοι">
                        <AllGradesComponent db={db} /> 
                    </Tab>
                    <Tab eventKey="ExamsGrades" title="Βαθμολογία ανα εξεταστική περιόδο">
                        <ExamsGradesComponent db={db} />
                    </Tab>
                </Tabs>
            </Container>
        </>
        );
    
}

export default ControlledGrades;