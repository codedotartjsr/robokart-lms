import React from 'react';
import './ExpiredSessionModal.css';

const ExpiredSessionModal = ({ isOpen, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Session Expired</h5>
          </div>
          <div className="modal-body">
            <p>Your session has expired due to inactivity. Please log in again to continue.</p>
          </div>
          <div className="modal-footer">
            <button onClick={onConfirm} className="confirm-button bg-primary">Log In</button>
          </div>
        </div>
      </div>
    );
  }
  export default ExpiredSessionModal;