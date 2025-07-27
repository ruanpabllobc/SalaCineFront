"use client";

import { useEffect, useState } from "react";
import { Filme } from "@/types/Filme";
import { getFilmes, deleteFilme } from "@/services/filmeService";
import { Table } from "@/components/Table";

export default function SalaList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

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
      // Atualiza a lista após a exclusão
      await fetchFilmes();
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
      alert("Erro ao excluir filme");
    }
  };

  if (loading)
    return <div className="p-4 text-center">Carregando filmes...</div>;

  if (filmes.length === 0)
    return <div className="p-4 text-center">Nenhum filme encontrado.</div>;

  return (
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
              <button
                key="delete"
                onClick={() => {
                  if (typeof filme.id_filme === "number")
                    handleDelete(filme.id_filme);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Excluir
              </button>,
            ]}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
