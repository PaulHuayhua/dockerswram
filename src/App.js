import React, { useState, useEffect } from 'react';
import './App.css';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';
import { getAlumnos, createAlumno, updateAlumno, deleteAlumno } from './services/alumnoService';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAlumnos();
      setAlumnos(data);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (alumno) => {
    try {
      setError(null);
      await createAlumno(alumno);
      await loadAlumnos();
    } catch (err) {
      setError('Error al crear el alumno');
      console.error(err);
    }
  };

  const handleUpdate = async (alumno) => {
    try {
      setError(null);
      await updateAlumno(editingAlumno.alumnoId, alumno);
      setEditingAlumno(null);
      await loadAlumnos();
    } catch (err) {
      setError('Error al actualizar el alumno');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        setError(null);
        await deleteAlumno(id);
        await loadAlumnos();
      } catch (err) {
        setError('Error al eliminar el alumno');
        console.error(err);
      }
    }
  };

  const handleEdit = (alumno) => {
    setEditingAlumno(alumno);
  };

  const handleCancelEdit = () => {
    setEditingAlumno(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservicio Maestro - CRUD Alumnos</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <AlumnoForm
          alumno={editingAlumno}
          onSubmit={editingAlumno ? handleUpdate : handleCreate}
          onCancel={handleCancelEdit}
        />
        
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : (
          <AlumnoList
            alumnos={alumnos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
