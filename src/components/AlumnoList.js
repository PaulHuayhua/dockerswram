import React from 'react';
import './AlumnoList.css';

const AlumnoList = ({ alumnos, onEdit, onDelete }) => {
  const getEstadoBadge = (estado) => {
    const badges = {
      ACTIVO: 'badge-activo',
      INACTIVO: 'badge-inactivo',
      RETIRADO: 'badge-retirado',
      SUSPENDIDO: 'badge-suspendido'
    };
    return badges[estado] || 'badge-default';
  };

  return (
    <div className="alumno-list">
      <h2>Lista de Alumnos</h2>
      
      {alumnos.length === 0 ? (
        <p className="empty-message">No hay alumnos registrados</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Grado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.alumnoId}>
                  <td>{alumno.codigoMatricula}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellidos}</td>
                  <td>{alumno.gradoActual}</td>
                  <td>
                    <span className={`badge ${getEstadoBadge(alumno.estado)}`}>
                      {alumno.estado}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(alumno)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(alumno.alumnoId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlumnoList;
