import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app = express();

interface Materia {
    id: number;
    name: string;
    description: string;    
}

const materias: Materia[] = [
    { id: 1, name: "Sistemas Digitales", description: "Materia donde aprenderan los fundamanetos de sistemas"},
    { id: 2, name:  "Cliente Servidor", description: "Enfocado a backend" }
];

let response: Response[] = [];

app.use(express.json());
app.use(cors());

app.get('/materias', (req: Request, res: Response) => {
    res.json({
        succes: true,
        materias
    });
});

app.get('/materias-nueva', (req: Request, res: Response) => {
    response.push(res);
});

app.post('/materias', (req: Request, res: Response) => {
    const idMateria = materias.length > 0 ? materias[materias.length -1].id + 1 : 1;
    const materia: Materia = {
        id: idMateria,
        name: req.body.name,
        description: req.body.description,
    }; 
    materias.push(materia);
    responderClientes(materia);
    res.json({
        succes: true,
        materia
    });
});

function responderClientes(materia: Materia) {
    for(let res of response) {
        res.json({
            succes: true,
            materia
        });
    }
    response = [];
}

app.listen(3000, () => console.log('servidor corriendo'));

