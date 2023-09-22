import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Option = 'JMeter' | 'K6' | 'Neoload' | 'LoadRunner';

const Popup = ({
    show,
    onHide,
    options,
    onSelect,
  }: {
    show: boolean;
    onHide: () => void;
    options: Option[];
    onSelect: (selectedOption: Option) => void;
  }) => {
    const [selectedOption, setSelectedOption] = useState<Option>('');
  
    const handleSelect = (option: Option) => {
      setSelectedOption(option);
    };
  
    const handleClose = () => {
      onSelect(selectedOption);
      onHide();
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Select Project Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {options.map((option) => (
            <Button
              key={option}
              variant="primary"
              onClick={() => handleSelect(option)}
              active={selectedOption === option}
            >
              {option}
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Run Selected
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default Popup;