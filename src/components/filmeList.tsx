"use client";

import { useEffect, useState } from "react";
import { Filme } from "@/types/Filme";
import { getFilmes } from "@/services/filmeService";
import { Table } from "@/components/Table";

export default function SalaList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const filmesData = await getFilmes();
        setFilmes(filmesData);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  if (loading)
    return <div className="p-4 text-center">Carregando salas...</div>;

  if (filmes.length === 0)
    return <div className="p-4 text-center">Nenhuma sessão encontrada.</div>;

  return (
    <Table.Root>
      <Table.Body>
        {filmes.map((filme) => (
          <Table.Row
            key={filme.id_filme}
            cellsContent={[
              filme.classificacao,
              filme.data_cadastro,
              filme.diretor,
              filme.duracao,
              filme.genero,
              filme.titulo,
            ]}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
