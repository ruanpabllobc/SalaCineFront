import { api } from "@/types/api";
import { Sessao, SessaoOutput } from "@/types/Sessao";

type CriarSessaoDTO = {
  data_hora: string;
  filme_id: number;
  sala_id: number;
};

interface ApiResponse {
  message: string;
  data: SessaoOutput[]; // Note que aqui usamos "sessoes" para manter consistência
}

export const createSessao = async (dados: CriarSessaoDTO): Promise<Sessao> => {
  try {
    const response = await api.post<{
      message: string;
      sessao?: Sessao;    // Sem acento
      sessão?: Sessao;    // Com acento
      id_sessao?: number;
    }>("/sessoes", dados);

    // Verifica ambos os possíveis nomes do campo
    const sessaoCriada = response.data.sessao || response.data.sessão;

    if (sessaoCriada) {
      return sessaoCriada;
    }

    // Se a mensagem for de sucesso, não lança erro
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
    console.log("Dados recebidos:", response.data); // Para debug
    return response.data.data || []; // Acessa a propriedade "data"
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
