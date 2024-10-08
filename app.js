const bcryptjs = require('bcryptjs');
// process.loadEnvFlie()


function encriptarPWD(){
    const resultado = bcryptjs.hashSync('Mi-Contrasenia-algo3+2#',14)
    console.log('El hash resultante es:',resultado)
}



//encriptarPWD();
 function validarPWD(){
     //Traemos la clave desde la DB
     const claveConHash = '$2a$14$EU32tL/i//pdfXNIvdjAyOgSm9djKQgA9Nkq1C3BEobFy8LvqQ9H6'
     const comparacion = bcryptjs.compareSync('Mi-Contrasenia-algo3+2#',claveConHash)

     console.log(comparacion ? 'Las claves coinciden' : 'Tu usuario o contraseña no coinciden')
 }

 validarPWD()  