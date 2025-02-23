import './ConfirmationModal.css';

function ConfirmationModal({ show, onClose, onConfirm, message }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-backdrop-custom">
        <div className="modal-content-custom">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Action</h5>
            {/* <button onClick={onClose} className="cancel-button">X</button> */}
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="cancel-button">No</button>
            <button onClick={onConfirm} className="confirm-button bg-primary">Yes</button>
          </div>
        </div>
      </div>
    );
  }
  export default ConfirmationModal;