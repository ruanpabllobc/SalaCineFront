"use client";

import { useState } from "react";
import { createSessao } from "@/services/sessaoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SessaoForm() {
  const [form, setForm] = useState({
    data_hora: "",
    filme: 0,
    sala: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataHoraFormatada = form.data_hora + ":00"; // Adiciona segundos
      const sessaoCriada = await createSessao({
        data_hora: dataHoraFormatada,
        id_filme: form.filme,
        id_sala: form.sala,
      });
      toast.success(`Sessão criada com sucesso! ID: ${sessaoCriada.id_sessao}`);
      // Reset do formulário
      setForm({
        data_hora: "",
        filme: 0,
        sala: 0,
      });
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID do Filme</label>
        <input
          type="number"
          value={form.filme}
          onChange={(e) => setForm({ ...form, filme: Number(e.target.value) })}
          required
          min="1"
        />
      </div>

      <div>
        <label>ID da Sala</label>
        <input
          type="number"
          value={form.sala}
          onChange={(e) => setForm({ ...form, sala: Number(e.target.value) })}
          required
          min="1"
        />
      </div>

      <div>
        <label>Data e Hora</label>
        <input
          type="datetime-local"
          value={form.data_hora}
          onChange={(e) => setForm({ ...form, data_hora: e.target.value })}
          required
        />
      </div>

      <button type="submit">Cadastrar Sessão</button>
    </form>
  );
}
