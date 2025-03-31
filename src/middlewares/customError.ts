export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name; // Opcional: poner el nombre de la clase como nombre del error
        Error.captureStackTrace(this, this.constructor); // Captura el stack trace
    }
}
