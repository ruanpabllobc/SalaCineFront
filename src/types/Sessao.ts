export interface Sessao {
    id_sessao?: number;
    data_hora: string;
    filme: number;
    sala: number;
}

export interface SessaoOutput {
    id_sessao: number;
    data_hora: string;
    filme: {
        id_filme: number;
        titulo: string;
    };
    sala: {
        id_sala: number;
        numero_sala: number;
    };
}