"use client";

import { useEffect, useState } from "react";
import { Sala } from "@/types/Sala";
import { getSalas } from "@/services/salaService";
import { Table } from "@/components/Table";

export default function SalaList() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const salasData = await getSalas();
        setSalas(salasData);
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

  return (
    <Table.Root>
      <Table.Body>
        {salas.map((sala) => (
          <Table.Row
            key={sala.id_sala}
            cellsContent={[sala.id_sala, sala.numero_sala, sala.local]}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
