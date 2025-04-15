// Função para processar o arquivo CSV
function processarCSV() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecione um arquivo CSV.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const conteudo = event.target.result;
        const dados = parseCSV(conteudo);
        exibirResultados(dados);
    };

    reader.readAsText(file);
}

// Função para converter o CSV em um array de objetos (nome, média)
function parseCSV(csv) {
    const linhas = csv.split('\n');
    const dados = [];
    console.log(linhas);  // Para depuração, pode remover depois

    for (let i = 1; i < linhas.length; i++) {
        // Ignora linhas vazias ou com apenas espaços
        if (linhas[i].trim() === '') continue;

        // Usa tabulação como delimitador (se o CSV usar outro separador, mude aqui)
        const colunas = linhas[i].split(';');

        // Verifica se a linha tem pelo menos 2 colunas (ALUNO e MÉDIA FINAL)
        if (colunas.length >= 2) {
            // Troca a vírgula por ponto para converter a média corretamente
            const nome = colunas[0].trim();
            const media = parseFloat(colunas[1].trim().replace(',', '.')); // Troca vírgula por ponto

            // Verifica se a média é um número válido
            if (nome && !isNaN(media)) {
                const aluno = {
                    nome: nome,
                    media: media
                };
                dados.push(aluno);
            }
        }
    }

    console.log(dados); // Exibe os dados no console para verificação
    return dados;
}

// Função para verificar o status do aluno com base na média
function verificarStatus(media) {
    if (media >= 6) {
        return 'Aprovado';
    } else if (media >= 5) {
        return 'Recuperação';
    } else {
        return 'Reprovado';
    }
}

// Função para exibir os resultados na tela
function exibirResultados(dados) {
    // Ordena os dados pelo nome do aluno (ordem alfabética)
    dados.sort((a, b) => a.nome.localeCompare(b.nome));

    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';  // Limpa os resultados anteriores

    // Cria a estrutura da tabela com cabeçalho
    let tabela = '<table>';
    tabela += '<tr><th>Nome</th><th>Média Final</th><th>Resultado</th></tr>';

    // Preenche a tabela com os dados dos alunos e seus resultados
    dados.forEach(aluno => {
        const status = verificarStatus(aluno.media);  // Calcula o status de cada aluno
        // Exibe a média com duas casas decimais
        const cssAlunoReprovado = status === "Reprovado" ? "aluno_reprovado" : "";
        tabela += `
            <tr>
                <td class="${cssAlunoReprovado}">${aluno.nome}</td>
                <td class="${cssAlunoReprovado}">${aluno.media.toFixed(2)}</td>
                <td class="${cssAlunoReprovado}">${status}</td>
            </tr>`;
    });

    tabela += '</table>';
    resultadosDiv.innerHTML = tabela;  // Exibe a tabela na página
}

