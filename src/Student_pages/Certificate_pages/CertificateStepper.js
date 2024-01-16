/* DeclarationsStepper.js */
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


const CertificateStepper = ({ activeStep }) => {
  return (
    <Container sx={{ mt: 10 }}>
      {/* mt: 10 == margin-top: 10px, βάζεις όση απόσταση θέλεις από τον header*/}
      <Stepper activeStep={activeStep} alternativeLabel>
        {/* alternativeLabel == οι επιλογές του stepper να είναι κάτω από τα steps. Αν το αφαιρέσεις μπαίνουν στην ίδια ευθεία */}
        <Step>
          <StepLabel>Επιλογή Πιστοποιητικού</StepLabel>
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
export default CertificateStepper;
