require('colors');

const {
    guardarDB,
    leerDB
} = require('./helpers/opcionesBD');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoDelete,
    confirmar,
    listadoCompletar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasBD = leerDB();

    if(tareasBD){
        tareas.cargarTareas(tareasBD);
    }
    
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarTareasCompPend(true);
                break;
            case '4':
                tareas.listarTareasCompPend(false);
                break;
            case '5':
                const ids = await listadoCompletar(tareas.arrayTareas);
                tareas.actualizarTareaCompletadas(ids);
                break;
            case '6':
                const id = await listadoDelete(tareas.arrayTareas);
                if(id !== '0'){
                    const ok = await confirmar('Estas seguro que deseas borrar esa preciada tarea?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    } 
                }
                
                break;
        }

        guardarDB(tareas.arrayTareas);
        await pausa();
        
    } while (opt !== '0');

}

main();