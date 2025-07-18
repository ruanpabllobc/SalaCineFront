import { api } from "@/types/api";
import { Sessao, SessaoOutput } from "@/types/Sessao";

type CriarSessaoDTO = {
  data_hora: string;
  filme_id: number;
  sala_id: number;
};

export const createSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  const response = await api.post<{
    message: string;
    sessao: Sessao;
  }>("/sessoes", dados);

  return response.data.sessao;
};

export async function getSessoes(): Promise<SessaoOutput[]> {
  try {
    const response = await api.get("/sessoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    throw error;
  }
}

export const getSessaoById = async (id: number): Promise<Sessao> => {
  try {
    const response = await api.get<Sessao>(`/filmes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar sessão com ID ${id}:`, error);
    throw error;
  }
};
