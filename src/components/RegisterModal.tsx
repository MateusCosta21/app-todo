import Register from "../pages/Register";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
