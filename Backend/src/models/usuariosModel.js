const bd = require("../config/database")

async function buscarTodos() {
    const sql = `SELECT id, nome_completo, data_aniversario, email, telefone 
    FROM usuarios`;
    const [resultado] = await bd.execute(sql);
    
    return resultado;
    
};

async function buscarPorID(id){
    const sql = 'SELECT * FROM usuarios WHERE id';
    const [resultado] = await bd.execute(sql [id]);
    
    return resultado;
};

async function criar({ cpf, cpfiv, cpftag, nomeCompleto, dataAniversario, email, telefone, senhaHash, senhaSalt}) {
    const sql = `INSERT INTO usuarios (cpf, cpf_iv, cpf_tag, nome_Completo, data_Aniversario, email, telefone, senha_Hash, senha_Salt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [resultado] = await bd.execute(sql,[
        cpf, cpfiv, cpftag, nomeCompleto, dataAniversario, email, telefone, senhaHash, senhaSalt
    ]);

    return resultado;
};

async function editar() {
    
};

async function excluir(id) {
    const sql = `DELETE FROM usuarios WHERE id ?;`;
    const [resultado] = await bd.execute(sql,[id]);

    return resultado.affectedRows;
}; 

module.exports = {
    buscarTodos,
    buscarPorID,
    criar,

    excluir
}
