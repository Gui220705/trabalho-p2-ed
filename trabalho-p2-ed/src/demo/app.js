
/* =========================================
   CONFIGURACOES INICIAIS
========================================= */

const areaBarras = document.getElementById("areaBarras");
const seletorAlgoritmo = document.getElementById("algoritmo");
const seletorVelocidade = document.getElementById("velocidade");

const botaoGerar = document.getElementById("gerarVetor");
const botaoPiorCaso = document.getElementById("piorCaso");
const botaoIniciar = document.getElementById("iniciar");
const botaoProximoPasso = document.getElementById("proximoPasso");
const botaoPausar = document.getElementById("pausar");
const botaoReiniciar = document.getElementById("reiniciar");

const elementoComparacoes = document.getElementById("comparacoes");
const elementoTrocas = document.getElementById("trocas");
const elementoMovimentacoes = document.getElementById("movimentacoes");
const elementoChamadas = document.getElementById("chamadasRecursivas");

const elementoStatus = document.getElementById("status");
const elementoDetalhes = document.getElementById("detalhes");

// Vetor inicial com 20 elementos.
let vetorInicial = gerarVetorAleatorio(20);

// Controle da animacao.
let eventos = [];
let indiceEvento = 0;
let temporizador = null;
let executando = false;
let finalizado = false;


/* =========================================
   GERACAO DO VETOR
========================================= */


function gerarVetorAleatorio(quantidade) {
    const vetor = [];

    for (let i = 0; i < quantidade; i++) {
        vetor.push(Math.floor(Math.random() * 151) - 50);
    }

    return vetor;
}



/* =========================================
   ESTATISTICAS
========================================= */

function criarEstatisticas() {
    return {
        comparacoes: 0,
        trocas: 0,
        movimentacoes: 0,
        chamadasRecursivas: 0
    };
}

function atualizarEstatisticas(estatisticas) {
    elementoComparacoes.textContent = estatisticas.comparacoes;
    elementoTrocas.textContent = estatisticas.trocas;
    elementoMovimentacoes.textContent = estatisticas.movimentacoes;
    elementoChamadas.textContent = estatisticas.chamadasRecursivas;
}

function zerarEstatisticas() {
    atualizarEstatisticas(criarEstatisticas());
}


/* =========================================
   REGISTRO DOS EVENTOS
========================================= */

function registrarEvento(tipo, descricao, dados, indices = [], extras = {}) {
    eventos.push({
        tipo: tipo,
        descricao: descricao,
        vetor: dados.slice(),
        estatisticas: { ...estatisticasAtuais },
        indices: indices,
        ...extras
    });
}

// Estatisticas utilizadas durante a criacao dos eventos.
let estatisticasAtuais = criarEstatisticas();


/* =========================================
   QUICK SORT
========================================= */

function criarEventosQuickSort(vetorOriginal) {
    const dados = vetorOriginal.slice();

    eventos = [];
    estatisticasAtuais = criarEstatisticas();

    function particionar(inicio, fim) {
        const pivo = dados[fim];
        let i = inicio - 1;

        registrarEvento(
            "pivo",
            `Pivô selecionado: ${pivo}. Analisando o intervalo de ${inicio} até ${fim}.`,
            dados,
            [fim],
            { inicio: inicio, fim: fim, pivo: fim }
        );

        for (let j = inicio; j < fim; j++) {

            estatisticasAtuais.comparacoes++;

            registrarEvento(
                "comparacao",
                `Comparando ${dados[j]} com o pivô ${pivo}.`,
                dados,
                [j, fim],
                { inicio: inicio, fim: fim, pivo: fim }
            );

            if (dados[j] <= pivo) {
                i++;

                if (i !== j) {
                    [dados[i], dados[j]] = [dados[j], dados[i]];

                    estatisticasAtuais.trocas++;
                    estatisticasAtuais.movimentacoes += 2;

                    registrarEvento(
                        "troca",
                        `Troca realizada entre ${dados[j]} e ${dados[i]}.`,
                        dados,
                        [i, j],
                        { inicio: inicio, fim: fim, pivo: fim }
                    );
                }
            }
        }

        if (i + 1 !== fim) {
            [dados[i + 1], dados[fim]] = [dados[fim], dados[i + 1]];

            estatisticasAtuais.trocas++;
            estatisticasAtuais.movimentacoes += 2;

            registrarEvento(
                "troca",
                "Pivô colocado em sua posição correta.",
                dados,
                [i + 1, fim],
                { inicio: inicio, fim: fim, pivo: i + 1 }
            );
        }

        const posicaoPivo = i + 1;

        registrarEvento(
            "pivo",
            `Pivô ${pivo} posicionado na posição ${posicaoPivo}.`,
            dados,
            [posicaoPivo],
            { inicio: inicio, fim: fim, pivo: posicaoPivo }
        );

        return posicaoPivo;
    }

    function ordenar(inicio, fim) {
        estatisticasAtuais.chamadasRecursivas++;

        registrarEvento(
            "recursao",
            `Chamada recursiva para o intervalo de ${inicio} até ${fim}.`,
            dados,
            [],
            { inicio: inicio, fim: fim }
        );

        if (inicio < fim) {
            const posicaoPivo = particionar(inicio, fim);

            ordenar(inicio, posicaoPivo - 1);
            ordenar(posicaoPivo + 1, fim);
        }
    }

    ordenar(0, dados.length - 1);

    registrarEvento(
        "concluido",
        "Quick Sort finalizado! Vetor completamente ordenado.",
        dados,
        dados.map((_, indice) => indice)
    );
}


/* =========================================
   MERGE SORT
========================================= */

function criarEventosMergeSort(vetorOriginal) {
    const dados = vetorOriginal.slice();

    eventos = [];
    estatisticasAtuais = criarEstatisticas();

    function intercalar(inicio, meio, fim) {
        const esquerda = dados.slice(inicio, meio + 1);
        const direita = dados.slice(meio + 1, fim + 1);

        let i = 0;
        let j = 0;
        let k = inicio;

        registrarEvento(
            "divisao",
            `Intercalando os intervalos de ${inicio} até ${meio} e de ${meio + 1} até ${fim}.`,
            dados,
            [],
            { inicio: inicio, fim: fim }
        );

        while (i < esquerda.length && j < direita.length) {

            estatisticasAtuais.comparacoes++;

            registrarEvento(
                "comparacao",
                `Comparando ${esquerda[i]} com ${direita[j]}.`,
                dados,
                [inicio + i, meio + 1 + j],
                { inicio: inicio, fim: fim }
            );

            if (esquerda[i] <= direita[j]) {
                dados[k] = esquerda[i];
                i++;
            } else {
                dados[k] = direita[j];
                j++;
            }

            estatisticasAtuais.movimentacoes++;

            registrarEvento(
                "movimentacao",
                `Elemento ${dados[k]} colocado na posição ${k}.`,
                dados,
                [k],
                { inicio: inicio, fim: fim }
            );

            k++;
        }

        while (i < esquerda.length) {
            dados[k] = esquerda[i];
            i++;

            estatisticasAtuais.movimentacoes++;

            registrarEvento(
                "movimentacao",
                `Elemento ${dados[k]} colocado na posição ${k}.`,
                dados,
                [k],
                { inicio: inicio, fim: fim }
            );

            k++;
        }

        while (j < direita.length) {
            dados[k] = direita[j];
            j++;

            estatisticasAtuais.movimentacoes++;

            registrarEvento(
                "movimentacao",
                `Elemento ${dados[k]} colocado na posição ${k}.`,
                dados,
                [k],
                { inicio: inicio, fim: fim }
            );

            k++;
        }
    }

    function ordenar(inicio, fim) {
        estatisticasAtuais.chamadasRecursivas++;

        registrarEvento(
            "recursao",
            `Analisando o intervalo de ${inicio} até ${fim}.`,
            dados,
            [],
            { inicio: inicio, fim: fim }
        );

        if (inicio >= fim) {
            return;
        }

        const meio = Math.floor((inicio + fim) / 2);

        ordenar(inicio, meio);
        ordenar(meio + 1, fim);

        intercalar(inicio, meio, fim);
    }

    ordenar(0, dados.length - 1);

    registrarEvento(
        "concluido",
        "Merge Sort finalizado! Vetor completamente ordenado.",
        dados,
        dados.map((_, indice) => indice)
    );
}


/* =========================================
   DESENHO DAS BARRAS
========================================= */


function renderizarBarras(vetor, evento = null) {
    areaBarras.innerHTML = "";

    // Maior magnitude para manter a escala proporcional.
    const maiorMagnitude = Math.max(
        ...vetor.map(valor => Math.abs(valor)),
        1
    );

    const alturaMaxima = 120;

    // Área interna do gráfico.
    const grafico = document.createElement("div");
    grafico.classList.add("grafico-barras");

    // Linha horizontal que representa o zero.
    const linhaZero = document.createElement("div");
    linhaZero.classList.add("linha-zero");

    vetor.forEach((valor, indice) => {
        // Coluna que ocupa toda a altura do gráfico.
        const coluna = document.createElement("div");
        coluna.classList.add("coluna-barra");

        // Barra que representa o valor.
        const barra = document.createElement("div");
        barra.classList.add("barra");

        // Calcula a altura proporcional ao valor absoluto.
        const altura = valor === 0
            ? 0
            : Math.max(4, (Math.abs(valor) / maiorMagnitude) * alturaMaxima);

        barra.style.height = `${altura}px`;
        barra.style.width = "100%";
        barra.style.position = "absolute";
        barra.style.left = "0";
        barra.style.transition =
            "height 0.2s, background-color 0.2s";

        // Define o posicionamento conforme o sinal.
        if (valor > 0) {
            barra.style.bottom = "50%";
            barra.style.borderRadius = "5px 5px 0 0";
        } else if (valor < 0) {
            barra.style.top = "50%";
            barra.style.borderRadius = "0 0 5px 5px";
        } else {
            barra.style.top = "50%";
            barra.style.height = "0px";
        }

        // Cor normal.
        let cor = "#3b82f6";

        if (evento) {
            if (evento.tipo === "concluido") {
                cor = "#22c55e";

            } else if (evento.indices.includes(indice)) {

                if (evento.tipo === "pivo") {
                    cor = "#facc15";
                } else if (evento.tipo === "comparacao") {
                    cor = "#a855f7";
                } else if (evento.tipo === "troca") {
                    cor = "#ef4444";
                } else if (evento.tipo === "movimentacao") {
                    cor = "#ef4444";
                }
            }
        }

        barra.style.backgroundColor = cor;

        // Texto com o valor numérico.
        const texto = document.createElement("span");

        texto.textContent = valor;
        texto.style.position = "absolute";
        texto.style.left = "50%";
        texto.style.transform = "translateX(-50%)";
        texto.style.fontSize = "10px";
        texto.style.color = "#f9fafb";
        texto.style.whiteSpace = "nowrap";
        texto.style.zIndex = "3";

        if (valor > 0) {
            texto.style.top = "-20px";
        } else if (valor < 0) {
            texto.style.bottom = "-20px";
        } else {
            texto.style.top = "-20px";
        }

        barra.appendChild(texto);
        coluna.appendChild(barra);
        grafico.appendChild(coluna);
    });

    // A linha zero fica acima das barras.
    grafico.appendChild(linhaZero);

    areaBarras.appendChild(grafico);
}



/* =========================================
   LEGENDA DINAMICA DO PIVO
========================================= */

function atualizarLegendaPivo() {
    const legendaPivo = document
        .querySelector(".cor-pivo")
        .closest(".legenda-item");

    if (seletorAlgoritmo.value === "quick") {
        legendaPivo.style.display = "flex";
    } else {
        legendaPivo.style.display = "none";
    }
}



/* =========================================
   PREPARACAO DA EXECUCAO
========================================= */

function pararAnimacao() {
    executando = false;

    if (temporizador !== null) {
        clearTimeout(temporizador);
        temporizador = null;
    }
}

function reiniciarTela() {
    pararAnimacao();

    eventos = [];
    indiceEvento = 0;
    finalizado = false;

    renderizarBarras(vetorInicial);
    zerarEstatisticas();

    elementoStatus.textContent = "Aguardando início da ordenação.";
    elementoDetalhes.textContent =
        "Selecione um algoritmo e inicie a execução.";
}

function prepararExecucao() {
    pararAnimacao();

    const algoritmo = seletorAlgoritmo.value;

    if (algoritmo === "quick") {
        criarEventosQuickSort(vetorInicial);
    } else {
        criarEventosMergeSort(vetorInicial);
    }

    indiceEvento = 0;
    finalizado = false;

    renderizarBarras(vetorInicial);
    zerarEstatisticas();

    elementoStatus.textContent = "Algoritmo preparado.";
    elementoDetalhes.textContent =
        "Pressione Iniciar para acompanhar a ordenação.";
}


/* =========================================
   VELOCIDADE DA ANIMACAO
========================================= */

function obterVelocidade() {
    const velocidade = Number(seletorVelocidade.value);

    const tempos = {
        1: 1000,
        2: 700,
        3: 450,
        4: 250,
        5: 100
    };

    return tempos[velocidade] || 450;
}


/* =========================================
   EXECUCAO PASSO A PASSO
========================================= */

function executarProximoEvento() {
    if (!executando) {
        return;
    }

    if (indiceEvento >= eventos.length) {
        pararAnimacao();

        finalizado = true;

        elementoStatus.textContent = "Ordenação concluída!";
        elementoDetalhes.textContent =
            "Todos os elementos foram ordenados com sucesso.";

        return;
    }

    const evento = eventos[indiceEvento];

    renderizarBarras(evento.vetor, evento);
    atualizarEstatisticas(evento.estatisticas);

    elementoStatus.textContent = evento.tipo.toUpperCase();
    elementoDetalhes.textContent = evento.descricao;

    indiceEvento++;

    if (indiceEvento >= eventos.length) {
        temporizador = setTimeout(() => {
            executarProximoEvento();
        }, obterVelocidade());
    } else {
        temporizador = setTimeout(
            executarProximoEvento,
            obterVelocidade()
        );
    }
}


/* =========================================
   BOTOES
========================================= */

// Gerar vetor aleatorio.
botaoGerar.addEventListener("click", () => {
    vetorInicial = gerarVetorAleatorio(20);
    reiniciarTela();

    elementoStatus.textContent = "Novo vetor gerado.";
});

// Criar cenário de pior caso.
botaoPiorCaso.addEventListener("click", () => {
    vetorInicial = Array.from(
        { length: 20 },
        (_, indice) => (indice + 1) * 5
    );

    seletorAlgoritmo.value = "quick";

    reiniciarTela();

    elementoStatus.textContent = "Cenário de pior caso preparado.";

    elementoDetalhes.textContent =
        "Vetor ordenado com pivô fixo no último elemento. O Quick Sort apresenta comportamento O(n²) neste cenário.";
});

// Iniciar ou continuar a execução.
botaoIniciar.addEventListener("click", () => {
    if (executando) {
        return;
    }

    if (finalizado) {
        prepararExecucao();
    }

    if (eventos.length === 0) {
        prepararExecucao();
    }

    executando = true;

    elementoStatus.textContent = "Executando ordenação...";

    executarProximoEvento();
});

// Avançar manualmente um evento.
botaoProximoPasso.addEventListener("click", () => {

    // Interrompe a animação automática, caso esteja executando.
    if (executando) {
        pararAnimacao();
    }

    // Impede avançar após a conclusão.
    if (finalizado) {
        elementoStatus.textContent = "Ordenação concluída!";
        elementoDetalhes.textContent =
            "Todos os elementos foram ordenados com sucesso.";
        return;
    }

    // Prepara os eventos caso ainda não tenham sido criados.
    if (eventos.length === 0) {
        prepararExecucao();
    }

    // Verifica se todos os eventos já foram apresentados.
    if (indiceEvento >= eventos.length) {
        finalizado = true;

        elementoStatus.textContent = "Ordenação concluída!";
        elementoDetalhes.textContent =
            "Todos os elementos foram ordenados com sucesso.";

        return;
    }

    // Obtém o próximo evento.
    const evento = eventos[indiceEvento];

    // Atualiza as barras e as estatísticas.
    renderizarBarras(evento.vetor, evento);
    atualizarEstatisticas(evento.estatisticas);

    // Apresenta as informações do evento.
    elementoStatus.textContent = evento.tipo.toUpperCase();
    elementoDetalhes.textContent = evento.descricao;

    // Avança o índice para o próximo evento.
    indiceEvento++;

    // Identifica quando o último evento foi apresentado.
    if (indiceEvento >= eventos.length) {
        finalizado = true;
    }
});

// Pausar a execução.
botaoPausar.addEventListener("click", () => {
    if (!executando) {
        return;
    }

    pararAnimacao();

    elementoStatus.textContent = "Execução pausada.";
});

// Reiniciar a execução.
botaoReiniciar.addEventListener("click", () => {
    reiniciarTela();
});


// Alterar algoritmo.
seletorAlgoritmo.addEventListener("change", () => {
    reiniciarTela();

    atualizarLegendaPivo();

    elementoStatus.textContent = "Algoritmo alterado.";
    elementoDetalhes.textContent =
        "Pressione Iniciar para executar o algoritmo selecionado.";
});


/* =========================================
   INICIALIZACAO
========================================= */

reiniciarTela();
atualizarLegendaPivo();
