const Tarea = require('./tarea');
require('colors');

class Tareas {

    _listado = {};

    get arrayTareas(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareas(tareas = []){

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
        // const tarea = new Tarea(tareas);
        // 
    }

    listarTareas(){
        console.log();
        this.arrayTareas.forEach((tarea, i) =>{
            const id = `${i + 1}`.green;
            const {desc, completado} = tarea;
            // const estado = (completado) ? 'Completada'.green : 'Pendiente'.red;
            let estado = 'Pendiente'.red;
            if(completado){
                estado = 'Completado'.green;
            }
            console.log(`${id}. ${desc} :::: ${estado}`);
        })
    }

    listarTareasCompPend(completadas = true){
        console.log();
        //Mi logica(mas larga)
        // if(completadas){
        //     this.arrayTareas.forEach((tarea, i) =>{
        //         const id = `${i + 1}`.green;
        //         const {desc, completado} = tarea;
        //         // const estado = (completado) ? 'Completada'.green : 'Pendiente'.red;
        //         let estado = 'Completado'.green;
        //         if(completado){
        //             console.log(`${id}. ${desc} :::: ${estado}`);
        //         }  
        //     })
        // }else{
        //     this.arrayTareas.forEach((tarea, i) =>{
        //         const id = `${i + 1}`.green;
        //         const {desc, completado} = tarea;
        //         // const estado = (completado) ? 'Completada'.green : 'Pendiente'.red;
        //         let estado = 'Pendiente'.red;
        //         if(!completado){
        //             console.log(`${id}. ${desc} :::: ${estado}`);
        //         }  
        //     })
        // }
        //Logica de fernando(mucho mas corta)
        let contador = 0
        this.arrayTareas.forEach((tarea) =>{
            const {desc, completado} = tarea;
            const estado = (completado) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas){
                if(completado){
                    contador += 1;
                    console.log(`${contador}. ${desc} :::: ${completado}`);
                }
            }else{
                if(!completado){
                    contador += 1;
                    console.log(`${contador}. ${desc} :::: ${estado}`);
                }
            }
            
        })
        
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    actualizarTareaCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completado) {
                tarea.completado = new Date().toISOString();
            }
        });
        this.arrayTareas.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = null;
            }
        })
    }

}

module.exports = Tareas;