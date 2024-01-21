/* DeclarationsStepper.js */
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


const DeclarationsStepper = ({ activeStep }) => {
  return (
    <Container sx={{ mt: 10 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Επιλογή μαθημάτων</StepLabel>
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
export default DeclarationsStepper;
