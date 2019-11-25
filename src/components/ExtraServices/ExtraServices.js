import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider } from 'semantic-ui-react';
import './ExtraServices.scss';

const ExtraServices = ({
  event,
  addExtraService,
  currentEventIndex
}) => {
  const [visible, toggleVisibility] = useState(false);
  const [securityAssistanceSelected, toggleSecurityAssistance] = useState(false);
  const [medicalAssistanceSelected, toggleMedicalAssistance] = useState(false);
  const [govApprovalSelected, toggleGovApproval] = useState(false);

  const handleSubmit = () => {
    if (securityAssistanceSelected) {
      addExtraService(currentEventIndex, 'securityAssistance');
    }
    if (medicalAssistanceSelected) {
      addExtraService(currentEventIndex, 'medicalAssistance');
    }
    if (govApprovalSelected) {
      addExtraService(currentEventIndex, 'govApproval');
    }
    toggleVisibility(!visible); 
  }
  
  return (
    <div>
      <Divider hidden />
      <Button
        content={!visible ? 'Order extra services' : 'Cancel'}
        onClick={() => toggleVisibility(!visible)}
        className="services-btn"
      />
      <div hidden={!visible} className="checkboxes">
        {!event.securityAssistanceAdded &&
          <Checkbox 
            checked={securityAssistanceSelected} 
            onChange={() => toggleSecurityAssistance(!securityAssistanceSelected)}
            label={<label>Security assistance</label>}
          /> 
        }
        {!event.medicalAssistanceAdded &&
          <Checkbox  
            checked={medicalAssistanceSelected} 
            onChange={() => toggleMedicalAssistance(!medicalAssistanceSelected)}
            label={<label>Medical assistance</label>} 
          /> 
        }
        {!event.govApprovalAdded &&
          <Checkbox 
            checked={govApprovalSelected} 
            onChange={() => toggleGovApproval(!govApprovalSelected)}
            label={<label>Gov approval</label>} 
          /> 
        }
        <Button onClick={handleSubmit} className="services-btn">Submit</Button>
      </div>
    </div>
  );
}

ExtraServices.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    peopleNumber: PropTypes.number,
    eventType: PropTypes.string,
    startDatetime: PropTypes.string,
    endDatetime: PropTypes.string,
  }).isRequired,
  addExtraService: PropTypes.func.isRequired,
  currentEventIndex: PropTypes.number.isRequired,
};

export default ExtraServices;
