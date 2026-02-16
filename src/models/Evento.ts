import { Schema, model } from "mongoose";

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Para modificar el comportamiento del método toJSON de Mongoose
// Esto es para eliminar el campo __v y _id, 
// y agregar un campo id con el valor de _id
EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return { ...object, id: _id };
});

export const Evento = model('Evento', EventoSchema);

