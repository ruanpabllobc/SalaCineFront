"use client";

import { useEffect, useState } from "react";
import { SessaoOutput } from "@/types/Sessao";
import { getSessoes, deleteSessao } from "@/services/sessaoService";
import { Table } from "@/components/Table";
import SessaoForm from "./SessaoForm";
import { Trash } from "lucide-react";

export default function SessaoList() {
  const [sessoes, setSessoes] = useState<SessaoOutput[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessoes();
  }, []);

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta sessão?")) {
      return;
    }

    try {
      await deleteSessao(id.toString());
      await fetchSessoes();
    } catch (error) {
      console.error("Erro ao excluir sessão:", error);
      alert("Erro ao excluir sessão");
    }
  };

  if (loading)
    return <div className="p-4 text-center">Carregando sessões...</div>;

  return (
    <div className="flex flex-col gap-16">
      <SessaoForm onSuccess={fetchSessoes} />
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Filme</Table.HeaderCell>
            <Table.HeaderCell>Sala</Table.HeaderCell>
            <Table.HeaderCell>Horário</Table.HeaderCell>
            <Table.HeaderCell>Ação</Table.HeaderCell>
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
                <button
                  key="delete"
                  onClick={() => {
                    if (typeof sessao.id_sessao === "number")
                      handleDelete(sessao.id_sessao);
                  }}
                  className="text-red-500"
                >
                  <Trash />
                </button>,
              ]}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
