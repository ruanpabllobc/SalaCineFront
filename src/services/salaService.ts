import { api } from "@/types/api";
import { Sala } from "@/types/Sala";

// Tipo para criação (remove campos auto-gerados)
type CriarSalaDTO = Omit<Sala, "id_sala">;

interface ApiResponse {
  message: string;
  salas: Sala[];
}

export const createSala = async (dados: CriarSalaDTO): Promise<Sala> => {
  try {
    const response = await api.post<{
      message: string;
      sala: Sala;
    }>("/salas", dados); // Endpoint em PT

    return response.data.sala;
  } catch (error) {
    console.error("Erro ao criar sala:", error);
    throw error;
  }
};

export const getSalas = async (): Promise<Sala[]> => {
  try {
    const response = await api.get<ApiResponse>("/salas");
    return response.data.salas;
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    throw error;
  }
};

export const getSalaById = async (id: number): Promise<Sala> => {
  try {
    const response = await api.get<Sala>(`/salas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar sala com ID ${id}:`, error);
    throw error;
  }
};

export async function deleteSala(id: string): Promise<void> {
  console.log(`Enviando requisição DELETE para /salas/${id}`);
  
  try {
    const response = await api.delete(`/salas/${id}`);
    
    console.log('Resposta da API:', response);
    
    if (response.status < 200 || response.status >= 300) {
      const errorData = response.data || {};
      console.error('Erro ao deletar:', errorData);
      throw new Error(errorData.message || 'Falha ao deletar sala');
    }
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
}
