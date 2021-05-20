const inquirer = require("inquirer");
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Crear una tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar una tarea`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        },
    ]
}]

const listadoDelete = async (tareas = []) => {
    
    const choicesTareas = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choicesTareas.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar una tarea',
            choices: choicesTareas
        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id;
    
}

const confirmar = async (mensaje) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const {ok} = await inquirer.prompt(pregunta)
    return ok;
}

const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opcion'.white);
    console.log('===========================\n'.green);

    const {
        opcion
    } = await inquirer.prompt(preguntas)

    return opcion;
}

const pausa = async () => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }];

    await inquirer.prompt(question);
    return question;
}

const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Ingrese una tarea';
            }

            return true;
        }
    }];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoCompletar = async (tareas = []) => {
    
    const choicesTareas = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completado) ? true : false
        }
    });
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione la/s saleras que completaste',
            choices: choicesTareas
        }
    ];

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
    
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoDelete,
    confirmar,
    listadoCompletar
}