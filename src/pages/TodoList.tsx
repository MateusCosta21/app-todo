import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa"; 

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filterStatus));
    }
  }, [tasks, filterStatus]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Usuário não autenticado. Faça login.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
      setError("Erro ao carregar tarefas. Verifique sua autenticação.");
    }
  };

  const handleDelete = async (taskId: number) => {
    const token = localStorage.getItem("access_token");

    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleMarkAsDone = async (taskId: number) => {
    if (window.confirm("Deseja marcar esta tarefa como concluída?")) {
      const token = localStorage.getItem("access_token");

      try {
        await axios.patch(
          `http://localhost:8000/api/tasks/${taskId}/status`,
          { status: "completed" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTasks(
          tasks.map(task =>
            task.id === taskId ? { ...task, status: "completed" } : task
          )
        );
      } catch (error) {
        console.error("Erro ao marcar como feito:", error);
      }
    }
  };

  const handleRevertToPending = async (taskId: number) => {
    if (window.confirm("Deseja reverter esta tarefa para pendente?")) {
      const token = localStorage.getItem("access_token");

      try {
        await axios.patch(
          `http://localhost:8000/api/tasks/${taskId}/status`,
          { status: "pending" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTasks(
          tasks.map(task =>
            task.id === taskId ? { ...task, status: "pending" } : task
          )
        );
      } catch (error) {
        console.error("Erro ao reverter para pendente:", error);
      }
    }
  };

  const handleEdit = async (task: Task) => {
    setEditTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setModalVisible(true);
  };

  const handleUpdateTask = async () => {
    if (!editTask) return;

    const token = localStorage.getItem("access_token");

    try {
      await axios.put(
        `http://localhost:8000/api/tasks/${editTask.id}/update`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(
        tasks.map(task =>
          task.id === editTask.id ? { ...task, title: newTitle, description: newDescription } : task
        )
      );

      setModalVisible(false);
      setEditTask(null);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const columns = [
    {
      name: "Título",
      selector: (row: Task) => row.title,
      sortable: true,
      cell: (row: Task) => (
        <span
          style={{
            textDecoration: row.status === "completed" ? "line-through" : "none",
          }}
        >
          {row.title}
        </span>
      ),
    },
    {
      name: "Descrição",
      selector: (row: Task) => row.description,
    },
    {
      name: "Status",
      selector: (row: Task) => row.status,
      cell: (row: Task) => (
        <span className={`badge ${row.status === "completed" ? "bg-success" : "bg-warning"}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Criado em",
      selector: (row: Task) => new Date(row.created_at).toLocaleString(),
    },
    {
      name: "Ações",
      cell: (row: Task) => (
        <div className="d-flex gap-2">
          {row.status === "pending" && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleMarkAsDone(row.id)}
            >
              <FaCheck />
            </button>
          )}
          {row.status === "completed" && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleRevertToPending(row.id)}
            >
              <FaUndo />
            </button>
          )}
          {row.status !== "completed" && (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEdit(row)}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(row.id)}
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Lista de Tarefas</h2>

        <div className="mb-3">
          <label className="form-label">Filtrar por Status</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <DataTable title="Tarefas" columns={columns} data={filteredTasks} pagination />
        )}
      </div>

      {/* Modal de Edição */}
      {modalVisible && editTask && (
        <div
          className="modal d-block"
          style={{ display: modalVisible ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Tarefa</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateTask}
                >
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
