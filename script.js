document.getElementById('form-participantes').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega o nome do participante
    const nome = document.getElementById('nome').value.trim();

    if (nome) {
        // Adiciona o nome à lista
        const li = document.createElement('li');
        li.textContent = nome;
        document.getElementById('lista-participantes').appendChild(li);

        // Limpa o campo de texto
        document.getElementById('nome').value = '';

        // Habilita o botão de sorteio
        document.getElementById('sortear').disabled = false;
    }
});

document.getElementById('sortear').addEventListener('click', function() {
    // Exibe a animação de carregamento
    document.getElementById('carregando').style.display = 'block';

    // Aguardar alguns segundos para simular o sorteio
    setTimeout(() => {
        // Desativa a animação de carregamento
        document.getElementById('carregando').style.display = 'none';
        
        // Exibir os resultados do sorteio
        const resultadoSection = document.querySelector('.resultado-section');
        resultadoSection.style.display = 'block'; // Mostra a seção de resultado
        
        const resultadoList = document.getElementById('resultado');
        resultadoList.innerHTML = ''; // Limpa os resultados anteriores

        const participantes = Array.from(document.querySelectorAll('#lista-participantes li'));
        
        // Embaralha os participantes e atribui os amigos secretos
        const amigos = [...participantes];
        const resultados = [];

        // Embaralha os participantes e distribui os amigos secretos
        const amigosSorteados = [];
        for (let i = 0; i < participantes.length; i++) {
            let sorteado = null;
            do {
                sorteado = amigos[Math.floor(Math.random() * amigos.length)];
            } while (sorteado === participantes[i] || amigosSorteados.includes(sorteado));
            amigosSorteados.push(sorteado);
            resultados.push(`${participantes[i].textContent} sorteou ${sorteado.textContent}`);
        }

        // Exibe os resultados
        resultados.forEach(resultado => {
            const li = document.createElement('li');
            li.textContent = resultado;
            resultadoList.appendChild(li);
        });

        // Exibe o botão de resetar
        document.getElementById('resetar').style.display = 'inline-block';
    }, 2000); // Espera 2 segundos para a animação de carregamento
});

document.getElementById('resetar').addEventListener('click', function() {
    // Limpa a lista de participantes e resultados
    document.getElementById('lista-participantes').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('carregando').style.display = 'none';
    document.querySelector('.resultado-section').style.display = 'none';
    document.getElementById('resetar').style.display = 'none';
    document.getElementById('sortear').disabled = true;
});

document.getElementById('voltar').addEventListener('click', function() {
    // Voltar para a tela inicial
    document.querySelector('.resultado-section').style.display = 'none';
    document.querySelector('.form-section').style.display = 'block';
    document.getElementById('resetar').style.display = 'none';
    document.getElementById('sortear').disabled = true;
    document.getElementById('lista-participantes').innerHTML = '';
});
