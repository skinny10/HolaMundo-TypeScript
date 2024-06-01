import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

interface Alumno {
    id: number;
    name: string;
    lastName: string;
    age: number;
    typeBlood: string;
}; 

app.use(cors());
app.use(express.json());

const alumnos: Alumno[] = [
    { id: 1, name: 'Juan', lastName: 'Perez', age: 20, typeBlood: 'o+' },
    { id: 2, name: 'Carlos', lastName: 'Molina', age: 19, typeBlood: 'A+' },
];

app.get('/alumnos', (req: Request, res: Response) => {
    res.json({
        success: true,
        alumnos
    });
});

app.post('/alumnos', (req: Request, res: Response) => {
    const idAlumnos = alumnos.length > 0 ? alumnos[alumnos.length - 1].id + 1 : 1;
    const alumno: Alumno = {
        id: idAlumnos,
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        typeBlood: req.body.typeBlood
    };
    alumnos.push(alumno);
    res.json({
        success: true,
        alumnos
    });
});

app.get('/alumnos/update', (req: Request, res: Response) => {
    const idLosAlumnos = parseInt(req.query.idLosAlumnos as string, 10);
    const nuevosAlumnos = alumnos.filter((alumno) => alumno.id > idLosAlumnos);
    res.json({
        success: true,
        nuevosAlumnos
    });
});

// Configurar la carpeta estática para servir el archivo HTML
app.use(express.static('src/client'));

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
