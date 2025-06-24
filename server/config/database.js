import { Sequelize } from 'sequelize';

// Database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'task_manager',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export { sequelize };