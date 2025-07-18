import { api } from "@/types/api";
import { Sala } from "@/types/Sala";

// Tipo para criação (remove campos auto-gerados)
type CriarSalaDTO = Omit<Sala, "id_sala">;

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
    const response = await api.get<Sala[]>("/salas");
    return response.data;
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
