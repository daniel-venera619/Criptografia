const crypto = require("crypto");

const { promisify} = require("util");
const scrypt = promisify(crypto.scrypt);

async function gerarHashSenha(senha) {
    const salt = crypto.randomBytes(16);
    const hash = await scrypt(senha, salt, 64);

    return {salt, hash};
};

async function verificarHashSenha(senha, { saltArmazenado, hashSenhaArmazenada } ) {
    const novoHash =  await scrypt(senha, saltArmazenado, 64);
    return crypto.timingSafeEqual(hashSenhaArmazenada, novoHash);    
}

module.exports = {
    gerarHashSenha,
    verificarHashSenha
}