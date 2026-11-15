P2 - Estrutura de Dados
IDENTIFICAÇÃO
Guilherme da Silva Souza
RA: 2840482521030
Tema: Quick Sort vs. Merge Sort
LINK DO VÍDEO EXPLICATIVO:https://youtu.be/MgRSoGLzb70
QUICK SORT
O Quick Sort é um algoritmo de ordenação baseado na escolha de um elemento chamado pivô, utilizado como referência para dividir o vetor.
Neste projeto, foi adotado o último elemento do intervalo como pivô.
Durante a execução, os elementos menores ou iguais ao pivô são posicionados à sua esquerda, enquanto os maiores ficam à direita. Após essa divisão, o pivô ocupa sua posição definitiva no vetor.
O processo é repetido recursivamente nos subvetores restantes até que todos os elementos estejam ordenados
FUNCIONAMENTO
Selecionar o último elemento do intervalo como pivô.
Comparar os demais elementos com o pivô.
Posicionar os elementos menores ou iguais à sua esquerda.
Colocar o pivô em sua posição correta.
Repetir o processo nos subvetores até concluir a ordenação.
APLICAÇÃO NO MUNDO REAL
O Quick Sort é utilizado em sistemas que precisam organizar grandes conjuntos de dados de maneira eficiente. Pode ser aplicado em operações de ordenação de registros, listas de produtos, resultados de pesquisas e informações armazenadas em sistemas computacionais.
Sua eficiência média de O(n log n) faz com que seja uma opção interessante em diferentes aplicações que necessitam de ordenação rápida. Entretanto, seu desempenho depende da escolha do pivô, podendo atingir O(n²) em situações desfavoráveis.
MERGE SORT
O Merge Sort é um algoritmo de ordenação que utiliza a divisão recursiva do vetor em partes menores.
O processo continua até que cada subdivisão contenha apenas um elemento. Em seguida, os subvetores são intercalados de maneira ordenada, comparando seus elementos e reconstruindo o vetor original.
Esse procedimento continua até que todos os elementos estejam reunidos em um único vetor ordenado.
FUNCIONAMENTO
Dividir o vetor em duas partes.
Repetir a divisão recursivamente até obter subvetores unitários.
Comparar os elementos dos subvetores.
Intercalar os elementos em ordem crescente.
Repetir a intercalação até reconstruir o vetor completamente ordenado.
APLICAÇÃO NO MUNDO REAL
O Merge Sort é utilizado em situações que exigem a ordenação eficiente de grandes volumes de dados. Uma de suas aplicações é a ordenação externa (External Sorting), utilizada quando os dados são grandes demais para serem armazenados integralmente na memória principal.
Também pode ser aplicado na organização de arquivos, registros e conjuntos de dados que precisam ser ordenados de maneira previsível.
Sua complexidade de O(n log n) em todos os casos torna o algoritmo uma alternativa interessante quando se busca desempenho consistente, especialmente em operações envolvendo grandes quantidades de informações.
TABELA DE COMPLEXIDADE
Algoritmo	  Caso	      Tempo	      Espaço auxiliar
Quick Sort	  Melhor	O(n log n)	      O(log n)
Quick Sort	  Médio	    O(n log n)	      O(log n)
Quick Sort	  Pior	      O(n²)	            O(n)
Merge Sort	  Melhor	O(n log n)	        O(n)
Merge Sort	  Médio	    O(n log n)	        O(n)
Merge Sort	  Pior	    O(n log n)	        O(n)
PIOR CASO QUICK SORT
Ocorre quando as escolhas de pivô produzem partições muito desequilibradas, por exemplo, separando um elemento de todos os demais repetidamente. Isso pode acontecer com um vetor já ordenado quando se escolhe sempre o último elemento como pivô, como fazemos em nossa implementação.
PIOR CASO MERGE SORT
Não apresenta um pior caso de tempo assintótico diferente dos demais. Mesmo no pior cenário, continua dividindo o vetor em partes aproximadamente iguais e realizando a intercalação, mantendo O(n log n).
DIÁRIO DE ENGENHARIA COM IA
FERRAMENTA DE IA:
Durante o desenvolvimento do projeto, foi utilizada a ferramenta ChatGPT (GPT-6), da OpenAI, como apoio ao aprendizado dos algoritmos, implementação do simulador e identificação de problemas durante os testes.
PRINCIPAIS PROMPTS
PROMPT 1 - PLANEJAMENTO DO SIMULADOR
"Com base nos requisitos do trabalho P2 de Estruturas de Dados, desenvolva um simulador web para comparar Quick Sort e Merge Sort. Utilize HTML, CSS e JavaScript, mantendo a implementação Python como referência dos algoritmos. O simulador deve permitir visualizar a ordenação passo a passo, identificar pivôs, comparações, trocas e movimentações, além de apresentar estatísticas de execução e um cenário de pior caso para o Quick Sort."
PROMPT 2 - DESENVOLVIMENTO DO CSS
"Desenvolva uma folha de estilos CSS para o simulador de Quick Sort e Merge Sort, utilizando um tema escuro, interface organizada, botões destacados, painel de estatísticas, área de visualização das barras e cores distintas para representar pivô, comparações, trocas e elementos ordenados. Inclua também responsividade para telas menores."
PROMPT 3 - DESENVOLVIMENTO DO SIMULADOR JAVASCRIPT
"Desenvolva o JavaScript do simulador de Quick Sort e Merge Sort, implementando a execução passo a passo, animação das barras, identificação visual de pivôs, comparações e trocas, controles de execução e contadores de operações. Mantenha os mesmos critérios de instrumentação da implementação Python."
PROBLEMA ENCONTRADO E AJUSTE MANUAL
Durante os testes do simulador, foi identificado um problema na representação visual dos números negativos.
Inicialmente, todas as barras eram desenhadas para cima, independentemente de seus valores serem positivos ou negativos. Isso fazia com que a representação visual não correspondesse corretamente aos valores armazenados no vetor.
Para corrigir o problema, foi necessário ajustar manualmente a função renderizarBarras() no arquivo JavaScript e modificar o CSS da área de visualização.
A solução implementada estabeleceu uma linha horizontal representando o valor zero, permitindo que os números positivos fossem representados acima dela e os negativos abaixo, mantendo proporções de altura de acordo com seus valores.
Após os ajustes, foram realizados novos testes para verificar o funcionamento das barras e preservar as animações dos dois algoritmos.
