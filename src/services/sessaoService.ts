import { api } from "@/types/api";
import { Sessao, SessaoOutput } from "@/types/Sessao";

type CriarSessaoDTO = {
  data_hora: string;
  filme_id: number;
  sala_id: number;
};

interface ApiResponse {
  message: string;
  data: SessaoOutput[];
}

export const createSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  try {
    const response = await api.post<{
      message: string;
      sessao?: Sessao;   
      sessão?: Sessao;  
      id_sessao?: number;
    }>("/sessoes", dados);

    const sessaoCriada = response.data.sessao || response.data.sessão;

    if (sessaoCriada) {
      return sessaoCriada;
    }

    if (response.data.message?.includes("sucesso")) {
      return { ...dados, id_sessao: response.data.id_sessao, filme: 0, sala: 0 };
    }

    throw new Error(response.data.message || "Sessão não foi criada corretamente.");
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    throw error;
  }
};

export const getSessoes = async (): Promise<SessaoOutput[]> => {
  try {
    const response = await api.get<ApiResponse>("/sessoes");
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    return [];
  }
};

export const getSessaoById = async (id: number): Promise<Sessao> => {
  try {
    const response = await api.get<Sessao>(`/sessoes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar sessão com ID ${id}:`, error);
    throw error;
  }
};

export async function deleteSessao(id: string): Promise<void> {
  console.log(`Enviando requisição DELETE para /sessoes/${id}`);
  
  try {
    const response = await api.delete(`/sessoes/${id}`);
    
    console.log('Resposta da API:', response);
    
    if (response.status < 200 || response.status >= 300) {
      const errorData = response.data || {};
      console.error('Erro ao deletar:', errorData);
      throw new Error(errorData.message || 'Falha ao deletar sessão');
    }
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
}
