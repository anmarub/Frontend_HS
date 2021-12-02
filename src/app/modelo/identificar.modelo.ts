import { ModeloDatos } from './datos.modelo';

export class ModeloIdentificar {
    datos?: ModeloDatos    // deben se iguales al arreglo(Array) de backend - persona.controller metodo post identificarPersona
    tk?: string // deben se iguales a la respuesta - persona.controller metodo post identificarPersona
}