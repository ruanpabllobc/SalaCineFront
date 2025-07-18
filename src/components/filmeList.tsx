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
        console.log("Dados recebidos:", filmesData);
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
    return <div className="p-4 text-center">Carregando filmes...</div>;

  if (filmes.length === 0)
    return <div className="p-4 text-center">Nenhum filme encontrado.</div>;

  return (
    <Table.Root>
      <Table.Body>
        {filmes.map((filme) => (
          <Table.Row
            key={filme.id_filme}
            cellsContent={[
              filme.titulo,
              filme.diretor,
              filme.classificacao,
              filme.duracao,
            ]}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
