export function valida(input){
    const tipoInput = input.dataset.tipo;

    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    };

    if(input.validity.valid){
        input.parentNode.classList.remove('input-container--invalido');
    } else {
        input.parentNode.classList.add('input-container--invalido');
        input.parentNode.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemErro(input, tipoInput);
    }; 
};

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensErro = {
    nome:{
        valueMissing: 'O campo não pode estar vazio.'
    },
    email:{
        valueMissing: 'O campo e-mail não pode estar vazio.',
        typeMismatch: 'O e-mail digitado não é válido.',
    },
    senha:{
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter pelo menos uma letra MAIÚSCULA, pelo menos uma letra minúscula, no mínimo um número e no mínimo um caracter especial. Tendo entre 6 a 10 caracteres.'
    }, 
    dataNascimento:{
        customError: 'Você deve ser maior de 18 e menor de 100 anos para se cadastrar. O campo também não pode ficar vazio.'
    }
};

function mostraMensagemErro(input, tipoInput){
    let mensagem = "";

    tiposDeErros.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensErro[tipoInput][erro];
        };
    });

    return mensagem;
};

const validadores = {
    dataNascimento:input => validaDataNascimento(input)
};

function validaDataNascimento(input){
    const dataRecebida = new Date(input.value);
    const dataAtual = new Date();
    let mensagem = '';

    if(!maiorQue18(dataRecebida, dataAtual)){
        mensagem = 'Você deve ver maior de idade para se cadastrar.';
    };

    if(dataRecebida < dataAtual.getUTCFullYear() - 100){
        mensagem = 'Data inválida.';
    };

    input.setCustomValidity(mensagem);
};

function maiorQue18(dataRecebida, dataAtual){
    const dataMais18 = new Date(dataRecebida.getUTCFullYear() + 18, dataRecebida.getUTCMonth(), dataRecebida.getUTCDate());

    return dataMais18 <= dataAtual;
};