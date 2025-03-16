import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa"; 

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

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
    const token = localStorage.getItem("access_token");

    try {
      await axios.put(
        `http://localhost:8000/api/tasks/${taskId}`,
        { status: "done" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(
        tasks.map(task =>
          task.id === taskId ? { ...task, status: "done" } : task
        )
      );
    } catch (error) {
      console.error("Erro ao marcar como feito:", error);
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
            textDecoration: row.status === "done" ? "line-through" : "none",
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
        <span className={`badge ${row.status === "done" ? "bg-success" : "bg-warning"}`}>
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
          <button className="btn btn-primary btn-sm">
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
          >
            <FaTrash />
          </button>
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

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <DataTable title="Tarefas" columns={columns} data={tasks} pagination />
        )}
      </div>
    </div>
  );
};

export default TodoList;
