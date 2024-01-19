/* StudentGradesStepper.js */
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

/* *****ΣΗΜΑΝΤΙΚΟ ΓΙΑ ΝΑ ΔΟΥΛΕΨΕΙ****
* npm install @mui/material
* npm install @emotion/react @emotion/styled 
Φτιάχνεις ένα αντίστοιχο αρχείο στα πιστοποιητικά, και βάζεις στα step και StepLabel αυτά που θέλεις 
Το activeStep είναι το που βρίσκεται τώρα ο χρήστης, πρέπει να φτιάξεις ένα const [activeStep, setActiveStep] = useState(0); στην σελίδα σου
 και να το περάσεις στο component. 
 Επίσης φτιάχνεις τα functions nextStep() και prevStep(), δες πως τα έχω κάνει στο NewDeclaration.js,
 για να τα περάσεις στα κουμπιά που σε πάνε στο επόμενο βήμα.
*/

const StudentGradesStepper = ({ activeStep }) => {
  return (
    <Container sx={{ mt: 10 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Εισαγωγή Βαθμών</StepLabel>
        </Step>
        <Step>
          <StepLabel>Προεπισκόπηση</StepLabel>
        </Step>
        <Step>
          <StepLabel>Ολοκλήρωση</StepLabel>
        </Step>
      </Stepper>
    </Container>
  );
};
export default StudentGradesStepper;
