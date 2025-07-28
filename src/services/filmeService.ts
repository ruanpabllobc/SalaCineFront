import { api } from "@/types/api";
import { Filme } from "@/types/Filme";

export const createFilm = async (formData: FormData): Promise<Filme> => {
  const response = await api.post("/filmes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.filme;
};

export const getFilmes = async (): Promise<Filme[]> => {
  try {
    const response = await api.get<Filme[]>("/filmes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
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

export async function deleteFilme(id: string): Promise<void> {
  console.log(`Enviando requisição DELETE para /filmes/${id}`);
  
  const response = await api.delete<Filme>(`filmes/${id}`, {
    method: 'DELETE',
  });

  console.log('Resposta da API:', response);
  
  if (response.status < 200 || response.status >= 300) {
    const errorData = response.data || {};
    console.error('Erro ao deletar:', errorData);
    throw new Error('Falha ao deletar filme');
  }
}

export async function updateFilme(
  id: number,
  data: FormData | {
    titulo: string;
    duracao: number;
    classificacao: number;
    diretor: string;
    generos: string[];
  }
) {
  return await api.put(`/filmes/${id}`, data);
}

