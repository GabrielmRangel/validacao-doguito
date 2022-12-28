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

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
};

function validaDataNascimento(input){
    const dataRecebida = new Date(input.value);
    const dataAtual = new Date();
    let mensagem = '';

    if(input.validity.valueMissing){
        mensagem = 'O campo Data de Nascimento não pode estar vazio.'; 
    };

    if(!maiorQue18(dataRecebida, dataAtual) && !input.validity.valueMissing && dataRecebida <= dataAtual){
        mensagem = 'Você deve ver maior de idade para se cadastrar.';
    };

    if(dataRecebida.getUTCFullYear() < dataAtual.getUTCFullYear() - 100 || dataRecebida.getUTCFullYear() > dataAtual.getUTCFullYear() + 100){
        mensagem = 'Data inválida.';
    };

    input.setCustomValidity(mensagem);

    return mensagem;
};

function maiorQue18(dataRecebida, dataAtual){
    const dataMais18 = new Date(dataRecebida.getUTCFullYear() + 18, dataRecebida.getUTCMonth(), dataRecebida.getUTCDate());

    return dataMais18 <= dataAtual;
};

function mostraMensagemErro(input, tipoInput){
    let mensagem = '';

    tiposDeErros.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensErro[tipoInput][erro];
        };
    });

    if(tipoInput === 'dataNascimento'){
        mensagem = validaDataNascimento(input);
    };

    return mensagem;
};

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensErro = {
    nome:{
        valueMissing: 'O campo Nome não pode estar vazio.'
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
        valueMissing: 'O campo Data de Nascimento não pode estar vazio.',
        customError: 'Data inválida.'
    },
    cpf:{
        valueMissing: 'O campo CPF não pode estar vazio.',
        customError: 'CPF inválido.'
    }
};

function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!testaCPF(cpfFormatado)){
        mensagem = 'CPF inválido.'
    };

    input.setCustomValidity(mensagem);
};

function testaCPF(cpfFormatado){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    let cpfValido = true;
    let soma = 0;
    let resto = 0;

    valoresRepetidos.forEach(valor => {
        if(valor == cpfFormatado){
            cpfValido = false;
        };
    });

    for(let i = 1; i <= 9; i++){
        soma = soma + parseInt(cpfFormatado.substring(i - 1, i) * (11 - i));
    };

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    };

    if (resto != parseInt(cpfFormatado.substring(9,10))) {
        cpfValido = false;
    };

    soma = 0;

    for(let i = 1; i <= 10; i++){
        soma = soma + parseInt(cpfFormatado.substring(i - 1, i) * (12 - i));
    };

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    };

    if(resto != parseInt(cpfFormatado.substring(10, 11))){
        cpfValido = false;
    };

    return cpfValido;
};