import { api } from "@/types/api";
import { Filme } from "@/types/Filme";

export const createFilm = async (formData: FormData): Promise<Filme> => {
  try {
    const response = await api.post("/filmes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.filme;
  } catch (error) {
    throw error;
  }
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
