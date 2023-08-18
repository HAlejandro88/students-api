const { Sequelize, DataTypes } = require('sequelize');
const studentsData = require('./models/students.json')

// Conectar a la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Definir el modelo de Estudiante
const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marks: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Seed de estudiantes


// Función asincrónica para insertar los datos de los estudiantes
const seedStudents = async () => {
  try {
    await sequelize.sync({ force: true }); // Elimina y recrea las tablas

    await Student.bulkCreate(studentsData);
    console.log('Datos de estudiantes insertados exitosamente');
  } catch (err) {
    console.error('Error al insertar datos de estudiantes:', err);
  } finally {
    sequelize.close();
  }
};

// Ejecutar la función de inserción de datos
seedStudents();
