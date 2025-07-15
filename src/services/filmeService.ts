import { api } from '@/types/api';
import { Filme } from '@/types/Filme';

// Tipo para criação (remove campos auto-gerados)
type CriarFilmeDTO = Omit<Filme, 'id_filme' | 'data_cadastro'>;

export const createFilm = async (dados: CriarFilmeDTO): Promise<Filme> => {
  try {
    const response = await api.post<{ 
      message: string;
      filme: Filme 
    }>('/filmes', dados); // Endpoint em PT
    
    return response.data.filme;
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    throw error;
  }
};

export const getFilmes = async (): Promise<Filme[]> => {
  try {
    const response = await api.get<Filme[]>('/filmes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

export const getFilmeById = async (id: number): Promise<Filme> => {
  try {
    const response = await api.get<Filme>(`/filmes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar filme com ID ${id}:`, error);
    throw error;
  }
};