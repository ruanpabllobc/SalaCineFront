"use client";

import { useEffect, useState } from "react";
import { Filme } from "@/types/Filme";
import { getFilmes, deleteFilme, getFilmeById } from "@/services/filmeService";
import { Table } from "@/components/Table";
import FilmeForm from "./FilmeForm";
import { toast } from "react-toastify";
import { Trash, Pencil } from "lucide-react";

export default function SalaList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filmeParaEditar, setFilmeParaEditar] = useState<Filme | null>(null);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const filmesData = await getFilmes();
      setFilmes(filmesData);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este filme?")) {
      return;
    }

    try {
      await deleteFilme(id.toString());
      await fetchFilmes();
      if (filmeParaEditar?.id_filme === id) {
        setFilmeParaEditar(null);
      }
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
      alert("Erro ao excluir filme");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const filme = await getFilmeById(id);
      setFilmeParaEditar(filme);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      toast.error("Falha ao carregar filme para edição");
    }
  };

  const handleSuccess = () => {
    setFilmeParaEditar(null);
    fetchFilmes();
  };

  if (loading)
    return <div className="p-4 text-center">Carregando filmes...</div>;

  if (filmes.length === 0)
    return <div className="p-4 text-center">Nenhum filme encontrado.</div>;

  return (
    <div className="flex flex-col gap-16">
      <FilmeForm
        filmeParaEditar={filmeParaEditar ?? undefined}
        onSuccess={handleSuccess}
        onCancel={() => setFilmeParaEditar(null)}
      />

      {filmes.length === 0 ? (
        <div className="p-4 text-center">Nenhum filme encontrado.</div>
      ) : (
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.HeaderCell>Diretor</Table.HeaderCell>
              <Table.HeaderCell>Classificação</Table.HeaderCell>
              <Table.HeaderCell>Duração</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filmes.map((filme) => (
              <Table.Row
                key={filme.id_filme}
                cellsContent={[
                  filme.titulo,
                  filme.diretor,
                  filme.classificacao,
                  filme.duracao,
                  <div key={filme.id_filme} className="flex gap-6">
                    <button
                      onClick={() => {
                        if (filme.id_filme) handleDelete(filme.id_filme);
                      }}
                      className="text-red-500"
                    >
                      <Trash />
                    </button>
                    <button
                      onClick={() =>
                        filme.id_filme && handleEdit(filme.id_filme)
                      }
                      className="text-[#FF9809]"
                    >
                      <Pencil />
                    </button>
                  </div>,
                ]}
              />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
}
