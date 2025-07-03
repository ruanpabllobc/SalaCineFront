"use client";

import { useState } from "react";
import { createSala } from "@/services/salaService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SalaForm() {
  const [form, setForm] = useState({
    numero_sala: 0,
    local: "",
    classificacao: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const salaCriada = await createSala(form);
      toast.success(
        `Sala ${salaCriada.numero_sala} cadastrada! ID: ${salaCriada.id_sala}`
      );

      // Reset do formulário
      setForm({
        numero_sala: 0,
        local: "",
        classificacao: 0,
      });
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número da Sala</label>
        <input
          type="number"
          value={form.numero_sala}
          onChange={(e) =>
            setForm({ ...form, numero_sala: Number(e.target.value) })
          }
          required
          min="1"
        />
      </div>

      <div>
        <label>Localização</label>
        <input
          value={form.local}
          onChange={(e) => setForm({ ...form, local: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Classificação</label>
        <input
          type="number"
          value={form.classificacao}
          onChange={(e) =>
            setForm({ ...form, classificacao: Number(e.target.value) })
          }
          required
          min="0"
          max="18"
        />
      </div>

      <button type="submit">Cadastrar Sala</button>
    </form>
  );
}
