const schema ={
    usuario:{
        type: "string",
        required: [true, "El nombre es obligatorio"]
    },
    clave:{
        type: "string",
        required: [true, "La clave es obligatorio"]
    },
    rol:{
        type: "string",
        required: true,
        emun:["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type: "boolean",
        default: true,
    },
} 