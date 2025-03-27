import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API RESTful",
    },
    host: 'http://152.67.55.245/',
    components: {
        schemas: {
            clientes: {
                id: 1,
                nome: "Caio Nóbile",
                cpf: "471.825.538-48",
                telefone: "18 99865-0344",
                email: "caio@gmail.com",
                cep: "194033-332",
                rua: "Rua João Cesar",
                bairro: "Vila São João",
                cidade: "Iepê",
                estado: "SP",
                numero: 211

            },
            produtos: {
                id: 1,
                nome: "Caneta Azul Bic",
                preco: 2.50,
                estoque: 100
            },
            vendas: {
                id: 1,
                quantidade: 20
            }
        }
    }
}

const outputJson = "./swagger-output.json";
// Aqui colocar todas as rodas exemplo:
// ['./routes/testeRoute.js', ./routes/teste2Route2.js']
const routes = ['./routes/clienteRoute.js',
    './routes/produtoRoute.js',
    './routes/vendaRoute.js',
    './routes/relatorioRoute.js'
]

swaggerAutogen({ openapi: '3.0.0' })(outputJson, routes, doc)
    .then(async () => {
        await import('./server.js');
    })
