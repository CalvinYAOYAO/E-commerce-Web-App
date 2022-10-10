import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import 'bootstrap/dist/css/bootstrap.css';

const steps = [
  'Purchase',
  'Cart',
  'Payment Info',
  'Shipping Info',
  'Check Out',
  'Finished'
];




function StepsBar(props) {
    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={props.curStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
        
    );
    
}

export default StepsBar;