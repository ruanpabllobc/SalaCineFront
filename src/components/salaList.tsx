"use client";

import { useEffect, useState } from "react";
import { Sala } from "@/types/Sala";
import { getSalas, deleteSala } from "@/services/salaService";
import { Table } from "@/components/Table";
import SalaForm from "./SalaForm";

export default function SalaList() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const salasData = await getSalas();
      setSalas(salasData);
      console.log("Dados das salas:", salasData);
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta sala?")) {
      return;
    }

    try {
      await deleteSala(id.toString());
      // Atualiza a lista após a exclusão
      await fetchSalas();
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      alert("Erro ao excluir sala");
    }
  };

  if (loading)
    return <div className="p-4 text-center">Carregando salas...</div>;

  return (
    <div>
      <SalaForm onSuccess={fetchSalas} />
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Número</Table.HeaderCell>
            <Table.HeaderCell>Local</Table.HeaderCell>
            <Table.HeaderCell>Ação</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {salas.map((sala) => (
            <Table.Row
              key={sala.id_sala}
              cellsContent={[
                sala.numero_sala,
                sala.local,
                <button
                  key="delete"
                  onClick={() => {
                    if (typeof sala.id_sala === "number")
                      handleDelete(sala.id_sala);
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
    </div>
  );
}
