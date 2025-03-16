import React, { useState } from "react";
import axios from "axios";

interface TaskModalProps {
  onClose: () => void;
}

const TaskModal = ({ onClose }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("access_token");

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/create",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Tarefa criada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
      alert("Erro ao criar tarefa");
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cadastrar Nova Tarefa</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCreateTask}>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
