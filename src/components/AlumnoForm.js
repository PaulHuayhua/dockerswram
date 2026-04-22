import React, { useState, useEffect } from 'react';
import './AlumnoForm.css';

const AlumnoForm = ({ alumno, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    codigoMatricula: '',
    gradoActual: '',
    estado: 'ACTIVO',
    apoderadoId: ''
  });

  useEffect(() => {
    if (alumno) {
      setFormData({
        nombre: alumno.nombre || '',
        apellidos: alumno.apellidos || '',
        codigoMatricula: alumno.codigoMatricula || '',
        gradoActual: alumno.gradoActual || '',
        estado: alumno.estado || 'ACTIVO',
        apoderadoId: alumno.apoderadoId || ''
      });
    } else {
      setFormData({
        nombre: '',
        apellidos: '',
        codigoMatricula: '',
        gradoActual: '',
        estado: 'ACTIVO',
        apoderadoId: ''
      });
    }
  }, [alumno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove apoderadoId if empty to let backend generate it
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.apoderadoId || dataToSubmit.apoderadoId.trim() === '') {
      delete dataToSubmit.apoderadoId;
    }
    onSubmit(dataToSubmit);
    if (!alumno) {
      setFormData({
        nombre: '',
        apellidos: '',
        codigoMatricula: '',
        gradoActual: '',
        estado: 'ACTIVO',
        apoderadoId: ''
      });
    }
  };

  return (
    <div className="alumno-form">
      <h2>{alumno ? 'Editar Alumno' : 'Nuevo Alumno'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos *</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="codigoMatricula">Código de Matrícula *</label>
            <input
              type="text"
              id="codigoMatricula"
              name="codigoMatricula"
              value={formData.codigoMatricula}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gradoActual">Grado Actual</label>
            <input
              type="text"
              id="gradoActual"
              name="gradoActual"
              value={formData.gradoActual}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="estado">Estado *</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="ACTIVO">ACTIVO</option>
              <option value="INACTIVO">INACTIVO</option>
              <option value="RETIRADO">RETIRADO</option>
              <option value="SUSPENDIDO">SUSPENDIDO</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="apoderadoId">ID Apoderado</label>
            <input
              type="text"
              id="apoderadoId"
              name="apoderadoId"
              value={formData.apoderadoId}
              onChange={handleChange}
              placeholder="UUID del apoderado"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {alumno ? 'Actualizar' : 'Crear'}
          </button>
          {alumno && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AlumnoForm;
