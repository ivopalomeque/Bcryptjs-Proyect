const express = require('express');
const bcryptjs = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = parseInt(process.env.SALTROUNDS) || 12;

// Variable global para almacenar el hash generado
let hashAlmacenado = null;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenid@s a la API de Bcryptjs.' });
});

// Endpoint para encriptar la contraseña
app.post('/encriptar', async (req, res) => {
    const { password } = req.body;

    // Verifica si la contraseña tiene al menos 10 caracteres
    if (password.length < 10) {
        return res.status(400).json({
            message: 'La contraseña debe tener al menos 10 caracteres',
        });
    }

    try {
        // Genera el hash de la contraseña
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        // Almacena el hash generado en la variable global
        hashAlmacenado = hashedPassword;

        // Retorna el hash con un código de estado 201
        return res.status(201).json({
            message: `Generación de hash exitosa: ${hashedPassword}`,
        });
    } catch (error) {
        // En caso de algún error en el proceso
        return res.status(500).json({
            message: 'Error al generar el hash',
        });
    }
});

// Endpoint para comparar la contraseña con el hash almacenado
app.get('/comparar', async (req, res) => {
    const { password } = req.query; 

    if (!password) {
        return res.status(400).json({
            message: 'Debes enviar una contraseña para comparar',
        });
    }

    // Verifica si hay un hash almacenado
    if (!hashAlmacenado) {
        return res.status(400).json({
            message: 'No hay un hash almacenado. Primero encripta una contraseña.',
        });
    }

    try {
        // Compara la contraseña en texto plano con el hash almacenado
        const isMatch = await bcryptjs.compare(password, hashAlmacenado);

        if (isMatch) {
            // Si la comparación es exitosa
            return res.status(200).json({
                message: 'Comparación exitosa!',
            });
        } else {
            // Si no coincide
            return res.status(400).json({
                message: 'No se ha podido validar la clave',
            });
        }
    } catch (error) {
        // Manejo de errores en la comparación
        return res.status(500).json({
            message: 'Error en la comparación de claves',
        });
    }
});

// Inicia el servidor
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));