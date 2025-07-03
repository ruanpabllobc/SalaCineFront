import { api } from '@/types/api';
import { Sala } from '@/types/Sala';

// Tipo para criação (remove campos auto-gerados)
type CriarSalaDTO = Omit<Sala, 'id_sala'>;

export const createSala = async (dados: CriarSalaDTO): Promise<Sala> => {
  try {
    const response = await api.post<{ 
      message: string;
      sala: Sala 
    }>('/salas', dados); // Endpoint em PT
    
    return response.data.sala;
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    throw error;
  }
};