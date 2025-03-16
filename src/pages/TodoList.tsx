import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const columns = [
    {
      name: 'Task Title',
      selector: (row: any) => row.title,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <Button variant="danger" onClick={() => deleteTask(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteTask = async (id: number) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        striped
        responsive
      />
    </div>
  );
};

export default TodoList;
