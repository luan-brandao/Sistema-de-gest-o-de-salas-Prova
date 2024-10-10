const { sequelize } = require('../config/mysql');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Gera um UUID automaticamente
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: true, // Validação do formato do email
        },
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            len: {
                args: [6, 100], // Comprimento mínimo da senha
                msg: 'A senha deve ter entre 6 e 100 caracteres.'
            },
        },
    },
}, {
    
    timestamps: true,
});

// Usando o hook "beforeSave" para criptografar a senha
User.beforeSave(async (user) => {
    if (user.changed('password') && user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Método para validar senha
User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
