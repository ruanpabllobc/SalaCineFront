import { api } from '@/types/api';
import { Sessao } from '@/types/Sessao';

type CriarSessaoDTO = {
  data_hora: string;
  id_filme: number;
  id_sala: number;
};

export const createSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  const response = await api.post<{
    message: string;
    sessao: Sessao
  }>('/sessoes', dados);

  return response.data.sessao;
};