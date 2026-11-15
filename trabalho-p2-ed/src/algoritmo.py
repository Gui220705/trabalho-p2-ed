
"""
Trabalho P2 - Estruturas de Dados
Tema A: Quick Sort vs. Merge Sort

Implementacao dos algoritmos de ordenacao utilizando
a estrategia Dividir para Conquistar.

Os algoritmos foram implementados manualmente,
sem utilizar funcoes prontas de ordenacao.
"""

from typing import TypedDict


# ==================================================
# ESTRUTURA DOS CONTADORES
# ==================================================

class Estatisticas(TypedDict):
    """Define os contadores utilizados pelos algoritmos."""

    comparacoes: int
    trocas: int
    movimentacoes: int
    chamadas_recursivas: int


def criar_estatisticas() -> Estatisticas:
    """
    Cria e inicializa os contadores de operacoes.

    Returns:
        Estatisticas: Dicionario com os quatro contadores zerados.
    """

    return {
        "comparacoes": 0,
        "trocas": 0,
        "movimentacoes": 0,
        "chamadas_recursivas": 0
    }


# ==================================================
# QUICK SORT
# ==================================================

def quick_sort(vetor: list[int]) -> tuple[list[int], Estatisticas]:
    """
    Ordena uma lista utilizando o algoritmo Quick Sort.

    O ultimo elemento de cada particao e escolhido como pivo.
    Os elementos menores ou iguais ao pivo sao posicionados
    a esquerda, enquanto os maiores ficam a direita.

    Args:
        vetor (list[int]): Lista de numeros inteiros a ordenar.

    Returns:
        tuple[list[int], Estatisticas]:
            Uma tupla contendo a lista ordenada e as estatisticas.
    """

    dados = vetor.copy()
    estatisticas = criar_estatisticas()

    def particionar(inicio: int, fim: int) -> int:
        """
        Organiza os elementos de uma particao em relacao ao pivo.

        Args:
            inicio (int): Indice inicial da particao.
            fim (int): Indice final da particao.

        Returns:
            int: Posicao definitiva do pivo.
        """

        pivo = dados[fim]
        i = inicio - 1

        for j in range(inicio, fim):

            estatisticas["comparacoes"] += 1

            if dados[j] <= pivo:
                i += 1

                if i != j:
                    dados[i], dados[j] = dados[j], dados[i]

                    estatisticas["trocas"] += 1
                    estatisticas["movimentacoes"] += 2

        # Posiciona o pivo em sua posicao definitiva.
        if (i + 1) != fim:
            dados[i + 1], dados[fim] = dados[fim], dados[i + 1]

            estatisticas["trocas"] += 1
            estatisticas["movimentacoes"] += 2

        return i + 1

    def ordenar(inicio: int, fim: int) -> None:
        """
        Executa recursivamente a ordenacao das particoes.

        Args:
            inicio (int): Indice inicial da particao.
            fim (int): Indice final da particao.

        Returns:
            None: Modifica a lista interna durante a ordenacao.
        """

        estatisticas["chamadas_recursivas"] += 1

        if inicio < fim:
            posicao_pivo = particionar(inicio, fim)

            ordenar(inicio, posicao_pivo - 1)
            ordenar(posicao_pivo + 1, fim)

    ordenar(0, len(dados) - 1)

    return dados, estatisticas


# ==================================================
# MERGE SORT
# ==================================================

def merge_sort(vetor: list[int]) -> tuple[list[int], Estatisticas]:
    """
    Ordena uma lista utilizando o algoritmo Merge Sort.

    Divide a lista em duas partes recursivamente e depois
    combina os elementos em ordem crescente.

    Args:
        vetor (list[int]): Lista de numeros inteiros a ordenar.

    Returns:
        tuple[list[int], Estatisticas]:
            Uma tupla contendo a lista ordenada e as estatisticas.
    """

    dados = vetor.copy()
    estatisticas = criar_estatisticas()

    def intercalar(inicio: int, meio: int, fim: int) -> None:
        """
        Combina duas partes ordenadas em uma unica lista ordenada.

        Args:
            inicio (int): Indice inicial da primeira parte.
            meio (int): Indice final da primeira parte.
            fim (int): Indice final da segunda parte.

        Returns:
            None: Atualiza os elementos na lista principal.
        """

        esquerda = dados[inicio:meio + 1]
        direita = dados[meio + 1:fim + 1]

        i = 0
        j = 0
        k = inicio

        # Compara os elementos das duas partes.
        while i < len(esquerda) and j < len(direita):

            estatisticas["comparacoes"] += 1

            if esquerda[i] <= direita[j]:
                dados[k] = esquerda[i]
                i += 1
            else:
                dados[k] = direita[j]
                j += 1

            estatisticas["movimentacoes"] += 1
            k += 1

        # Copia os elementos restantes da esquerda.
        while i < len(esquerda):
            dados[k] = esquerda[i]

            estatisticas["movimentacoes"] += 1

            i += 1
            k += 1

        # Copia os elementos restantes da direita.
        while j < len(direita):
            dados[k] = direita[j]

            estatisticas["movimentacoes"] += 1

            j += 1
            k += 1

    def ordenar(inicio: int, fim: int) -> None:
        """
        Divide a lista e ordena suas partes recursivamente.

        Args:
            inicio (int): Indice inicial da parte analisada.
            fim (int): Indice final da parte analisada.

        Returns:
            None: Modifica a lista interna durante a ordenacao.
        """

        estatisticas["chamadas_recursivas"] += 1

        if inicio >= fim:
            return

        meio = (inicio + fim) // 2

        ordenar(inicio, meio)
        ordenar(meio + 1, fim)

        intercalar(inicio, meio, fim)

    ordenar(0, len(dados) - 1)

    return dados, estatisticas


# ==================================================
# FUNCOES AUXILIARES DE VALIDACAO
# ==================================================

def esta_ordenado(vetor: list[int]) -> bool:
    """
    Verifica manualmente se uma lista esta em ordem crescente.

    Args:
        vetor (list[int]): Lista que sera verificada.

    Returns:
        bool: True se estiver ordenada, False caso contrario.
    """

    for i in range(len(vetor) - 1):
        if vetor[i] > vetor[i + 1]:
            return False

    return True


def frequencias(vetor: list[int]) -> dict[int, int]:
    """
    Conta quantas vezes cada numero aparece na lista.

    Utilizada para verificar se a ordenacao preservou
    todos os elementos, incluindo os repetidos.

    Args:
        vetor (list[int]): Lista que sera analisada.

    Returns:
        dict[int, int]: Dicionario com os numeros e suas quantidades.
    """

    resultado: dict[int, int] = {}

    for numero in vetor:
        if numero in resultado:
            resultado[numero] += 1
        else:
            resultado[numero] = 1

    return resultado


def validar_estatisticas(estatisticas: Estatisticas) -> bool:
    """
    Verifica se os quatro contadores existem e possuem
    valores inteiros nao negativos.

    Args:
        estatisticas (Estatisticas): Contadores do algoritmo.

    Returns:
        bool: True se todos os contadores forem validos.
    """

    nomes = [
        "comparacoes",
        "trocas",
        "movimentacoes",
        "chamadas_recursivas"
    ]

    for nome in nomes:
        valor = estatisticas[nome]

        if not isinstance(valor, int) or valor < 0:
            return False

    return True


# ==================================================
# TESTES DOS ALGORITMOS
# ==================================================

def testar_algoritmos() -> None:
    """
    Executa testes de funcionamento e integridade
    dos algoritmos Quick Sort e Merge Sort.

    Verifica:
        - Ordenacao correta.
        - Preservacao dos elementos originais.
        - Preservacao do vetor recebido.
        - Igualdade entre os resultados.
        - Validade dos contadores.

    Returns:
        None: Exibe os resultados dos testes no terminal.
    """

    casos: list[list[int]] = [
        [],
        [5],
        [8, 3, 6, 1, 9, 2],
        [1, 2, 3, 4, 5, 6],
        [6, 5, 4, 3, 2, 1],
        [4, 2, 4, 1, 3, 2],
        [-5, 10, 0, -2, 8]
    ]

    for numero, vetor in enumerate(casos, start=1):

        original = vetor.copy()

        resultado_quick, stats_quick = quick_sort(vetor)
        resultado_merge, stats_merge = merge_sort(vetor)

        # Verifica se os algoritmos produziram listas ordenadas.
        assert esta_ordenado(resultado_quick)
        assert esta_ordenado(resultado_merge)

        # Verifica se os dois resultados sao iguais.
        assert resultado_quick == resultado_merge

        # Verifica se todos os elementos originais foram preservados.
        assert frequencias(resultado_quick) == frequencias(original)
        assert frequencias(resultado_merge) == frequencias(original)

        # Verifica se o vetor original nao foi modificado.
        assert vetor == original

        # Verifica se os contadores estao validos.
        assert validar_estatisticas(stats_quick)
        assert validar_estatisticas(stats_merge)

        print(f"\n========== TESTE {numero} ==========")
        print("Vetor original:", original)

        print("\nQUICK SORT")
        print("Resultado:", resultado_quick)
        print("Estatisticas:", stats_quick)

        print("\nMERGE SORT")
        print("Resultado:", resultado_merge)
        print("Estatisticas:", stats_merge)

        print("\nResultado: TESTE APROVADO!")

    # Teste especifico do pior caso do Quick Sort.
    vetor_ordenado = [1, 2, 3, 4, 5, 6]
    resultado, stats = quick_sort(vetor_ordenado)

    comparacoes_esperadas = (
        len(vetor_ordenado) * (len(vetor_ordenado) - 1) // 2
    )

    assert stats["comparacoes"] == comparacoes_esperadas

    print("\n========== TESTE DO PIOR CASO ==========")
    print("Vetor:", vetor_ordenado)
    print("Comparacoes:", stats["comparacoes"])
    print("Comparacoes esperadas:", comparacoes_esperadas)
    print("Resultado: TESTE APROVADO!")

    print("\nTODOS OS TESTES FORAM CONCLUIDOS COM SUCESSO!")


# ==================================================
# EXECUCAO PRINCIPAL
# ==================================================

if __name__ == "__main__":
    testar_algoritmos()
