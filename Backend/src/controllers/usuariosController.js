const usuariosModel = require("../models/usuariosModel");
const {gerarHashSenha,verificarHashSenha} = require("../utils/crypto/hash");
const {criptografar,descriptografar} = require("../utils/crypto/criptografia");

async function buscarTodos(req, res) {
    try{
        const usuarios = await usuariosModel.buscarTodos();
        return res.json(usuarios);
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuarios"});
    };
};

async function buscarPorID(req, res){
    try{
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorID(id);

        if(!usuario){
            return res.status(404).json({error: "Usuario não encontrado"});
        }
        const cpf = descriptografar({
            ivArmazenado: usuario.cpf.iv,
            tagArmazenado: usuario.cpf.tag,
            valorArmazenado: usuario.cpf
        });

        return res.json({
            id: usuario.id,
            cpf: cpf,
            nomeCompleto: usuario.nome_completo,
            dataAniversario: usuario.data_aniversario,
            email: usuario.email,
            telefone: usuario.telefone
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuario"});
    };
};

async function criar(req, res) {
    try{
        const {cpf, nomeCompleto, dataAniversario, email, telefone, senha} = req.body
        const {salt, hash} = await gerarHashSenha(senha);
        const {iv, tag, cpfCriptografado} = criptografar(cpf);

        const resultado = await usuariosModel.criar({
            cpf: cpfCriptografado,
            cpfiv: iv,
            cpftag: tag,
            nomeCompleto,
            dataAniversario,
            email,
            telefone,
            senhaHash: hash,
            senhaSalt: salt
        });

        return res.status(201).json({
            mensagem: "Usuario criado com sucesso"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Erro ao criar usuario"})
    };
};


