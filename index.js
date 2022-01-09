const { Client } = require('pg'); // 1. Realizar la conexión con PostgreSQL con la clase Client.(1 Punto)
const process = require('process');

const argumentos = process.argv.slice(2);
const metodo = argumentos[0]
const nombre = argumentos[1]
const rut = argumentos[2]
const curso = argumentos[3]
const nivel = argumentos[4]

const config = {
    user: "postgres",
    host: "localhost",
    database: "estudiantes",
    password: "2619",
    port: 5432,
}

const client = new Client(config);
client.connect();

async function ingresar() {   // 2. Crear una función asíncrona para registrar unnuevoestudianteenlabasededatos. (2 Puntos)
    const query = `insert into estudiantes (nombre, rut, curso, nivel) values ( '${nombre}' , '${rut}', '${curso}', ${nivel} ) RETURNING *;`
    const res = await client.query(query);
    console.log('Registro agregado', res.rows[0]);
    console.log('Campos del registro', res.fields.map( r => r.name).join(" - "));
    client.end();
}
if (metodo === 'nuevo') {
    ingresar()
} else if (metodo === 'rut'){
    consultaRut()    
} else if (metodo === 'consulta'){
    consulta()
} else if (metodo === 'editar'){
    editar()
} else if (metodo === 'eliminar'){
    eliminar()
}

async function consultaRut(){ // 3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.(2 Puntos)
    const rutEstudiante = argumentos[1]
    console.log(rutEstudiante);
    const res = await client.query(`SELECT * FROM estudiantes WHERE rut='${rutEstudiante}'`)
    console.log("Registros: ", res.rows);
    client.end()
}

async function consulta(){ // 4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.(1 Punto)
     const res = await client.query("SELECT * FROM estudiantes")
     console.log("Registros: ", res.rows)
     client.end()
}
 
async function editar(){ // 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.(2 Puntos)
    const res = await client.query(
        `UPDATE estudiantes SET nombre='${nombre}',rut='${rut}',curso='${curso}',nivel=${nivel} WHERE rut='${rut}' RETURNING *`
    )
    console.log("Registro modificado:", res.rows[0])
    console.log("Cantidad de registros afectados", res.rowCount)
    client.end()
}
 
async function eliminar() { // 6. Crear una función asíncrona para eliminar el registrodeunestudiantedelabasede datos.(2 Puntos)
    const res = await client.query(
        `DELETE FROM estudiantes WHERE rut='${rut}'`
    )
    console.log("Cantidad de registros afectados: ", res.rowCount)
    client.end()
}







