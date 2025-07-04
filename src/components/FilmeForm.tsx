"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createFilm } from "@/services/filmeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generos = [
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Ficção Científica",
  "Terror",
  "Romance",
  "Animação",
  "Documentário",
  "Fantasia",
  "Suspense",
  "Crime",
  "Mistério",
  "Musical",
  "Guerra",
  "Western",
  "Histórico",
  "Biografia",
  "Esporte",
  "Família",
];

const validationSchema = Yup.object().shape({
  titulo: Yup.string()
    .max(100, "O título deve ter no máximo 100 caracteres")
    .required("O título é obrigatório"),
  duracao: Yup.number()
    .integer("A duração deve ser um número inteiro")
    .min(1, "A duração mínima é 1 minuto")
    .required("A duração é obrigatória"),
  classificacao: Yup.number()
    .integer("A classificação deve ser um número inteiro")
    .min(0, "A classificação mínima é 0")
    .max(18, "A classificação máxima é 18")
    .required("A classificação é obrigatória"),
  genero: Yup.string().required("O gênero é obrigatório"),
  diretor: Yup.string()
    .max(100, "O diretor deve ter no máximo 100 caracteres")
    .required("O diretor é obrigatório"),
});

export default function FilmForm() {
  const formik = useFormik({
    initialValues: {
      titulo: "",
      duracao: 0,
      classificacao: 0,
      genero: "",
      diretor: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const filmeCriado = await createFilm(values);
        toast.success(
          `Filme "${filmeCriado.titulo}" cadastrado! ID: ${filmeCriado.id_filme}`,
        );
        resetForm();
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Falha ao cadastrar filme");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.titulo && formik.errors.titulo ? (
          <div style={{ color: "red" }}>{formik.errors.titulo}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="duracao">Duração (min)</label>
        <input
          id="duracao"
          name="duracao"
          type="number"
          value={formik.values.duracao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.duracao && formik.errors.duracao ? (
          <div style={{ color: "red" }}>{formik.errors.duracao}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="classificacao">Classificação</label>
        <input
          id="classificacao"
          name="classificacao"
          type="number"
          value={formik.values.classificacao}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.classificacao && formik.errors.classificacao ? (
          <div style={{ color: "red" }}>{formik.errors.classificacao}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="genero">Gênero</label>
        <select
          id="genero"
          name="genero"
          value={formik.values.genero}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Selecione um gênero</option>
          {generos.map((genero) => (
            <option key={genero} value={genero}>
              {genero}
            </option>
          ))}
        </select>
        {formik.touched.genero && formik.errors.genero ? (
          <div style={{ color: "red" }}>{formik.errors.genero}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="diretor">Diretor</label>
        <input
          id="diretor"
          name="diretor"
          type="text"
          value={formik.values.diretor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.diretor && formik.errors.diretor ? (
          <div style={{ color: "red" }}>{formik.errors.diretor}</div>
        ) : null}
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
