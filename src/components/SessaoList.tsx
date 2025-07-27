"use client";

import { useEffect, useState } from "react";
import { SessaoOutput } from "@/types/Sessao";
import { getSessoes } from "@/services/sessaoService";
import { Table } from "@/components/Table";

export default function SessaoList() {
  const [sessoes, setSessoes] = useState<SessaoOutput[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const sessoesData = await getSessoes();
        setSessoes(sessoesData);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessoes();
  }, []);

  if (loading)
    return <div className="p-4 text-center">Carregando sessões...</div>;

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Filme</Table.HeaderCell>
          <Table.HeaderCell>Sala</Table.HeaderCell>
          <Table.HeaderCell>Horário</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sessoes.map((sessao) => (
          <Table.Row
            key={sessao.id_sessao}
            cellsContent={[
              sessao.filme.titulo,
              sessao.sala.numero_sala,
              new Date(sessao.data_hora).toLocaleString(),
            ]}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
