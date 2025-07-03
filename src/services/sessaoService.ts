import { api } from '@/types/api';
import { Sessao } from '@/types/Sessao';

type CriarSessaoDTO = {
  data_hora: string;
  filme: number;
  sala: number;
};

// Em sessaoService.ts
export const createSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  const dadosFormatados = {
    ...dados,
    data_hora: formatToSQLiteDateTime(dados.data_hora) // Já formata para YYYY-MM-DD HH:MM:SS
  };
  console.log(`Enviando no formato SQLite:`, dadosFormatados.data_hora);
  const response = await api.post<{
    message: string;
    sessao: Sessao
  }>('/sessoes', dadosFormatados);
  return response.data.sessao;
};

// Formata para YYYY-MM-DD HH:MM:SS
function formatToSQLiteDateTime(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}