import React, {Fragment,useState} from 'react';
import uuid from 'react-uuid';

const Formulario = ({crearCita}) => {

    //Creando state para leer formulario
    const [cita,actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //Creando state para los errores
    const [error,actualizarError] = useState(false);

    //Funcion para actualizar cuando el usuario ingrese datos
    const  actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer valores
    const {mascota,propietario,fecha,hora,sintomas} = cita;
     
    //Cuando se envia formulario
    const submitCita = e =>{

        //Para evitar envio de datos por defecto
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
            hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar mensaje previo
        actualizarError(false);
        
        //Asignar un ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);

        //Reiniciar form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        });
    }

    return (  
        <Fragment>
            <h2>Crear cita</h2>

            {error ?  <p className="alerta-error">Todos los campos son obligatorios</p>
            : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Dueño de la mascota</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary "
                >Agregar Cita</button>
            </form>

        </Fragment>
    );
}
 
export default Formulario;