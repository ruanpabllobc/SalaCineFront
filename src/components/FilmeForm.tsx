"use client";

import { useState } from "react";
import { createFilm } from "@/services/filmeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilmForm() {
  const [form, setForm] = useState({
    titulo: "",
    duracao: 0,
    classificacao: 0,
    genero: "",
    diretor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const filmeCriado = await createFilm(form);
      toast.success(
        `Filme "${filmeCriado.titulo}" cadastrado! ID: ${filmeCriado.id_filme}`
      );

      // Reset do formulário
      setForm({
        titulo: "",
        duracao: 0,
        classificacao: 0,
        genero: "",
        diretor: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Falha ao cadastrar filme");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Duração (min)</label>
        <input
          type="number"
          value={form.duracao}
          onChange={(e) =>
            setForm({ ...form, duracao: Number(e.target.value) })
          }
          required
          min="1"
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
        />
      </div>

      <div>
        <label>Gênero</label>
        <input
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
        />
      </div>

      <div>
        <label>Diretor</label>
        <input
          value={form.diretor}
          onChange={(e) => setForm({ ...form, diretor: e.target.value })}
          required
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
