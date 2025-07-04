"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createFilm } from "@/services/filmeService";
import { toast } from "react-toastify";
import FloatingLabelInput from "./FloatingLabelInput";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";

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

const classificacoesEtarias = [
  { value: 0, label: "Livre" },
  { value: 10, label: "10 Anos" },
  { value: 12, label: "12 Anos" },
  { value: 14, label: "14 Anos" },
  { value: 16, label: "16 Anos" },
  { value: 18, label: "18 Anos" },
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
      classificacao: "",
      genero: "",
      diretor: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Converte a classificação para número antes de enviar
        const dataToSend = {
          ...values,
          classificacao: Number(values.classificacao),
        };
        const filmeCriado = await createFilm(dataToSend);
        toast.success(
          `Filme "${filmeCriado.titulo}" cadastrado! ID: ${filmeCriado.id_filme}`
        );
        resetForm();
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Falha ao cadastrar filme");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[750px] mx-auto px-5 pb-5 flex flex-col gap-10"
      style={{ paddingTop: "0px" }}
    >
      {/* Linha 1: Grupo de Texto*/}
      <div className="text-center">
        <h2 className="text-2xl">Adicionar Filme</h2>
        <h3 className="text-[#969696] text-lg">
          Adicione um novo filme ao catálogo
        </h3>
      </div>

      {/* Linha 2: Grupo de Inputs */}
      <div className="flex flex-col gap-8">
        <div>
          <FloatingLabelInput
            id="titulo"
            name="titulo"
            label="Título do Filme"
            value={formik.values.titulo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.titulo}
            error={formik.errors.titulo}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="diretor"
              name="diretor"
              label="Nome do Diretor"
              type="text"
              value={formik.values.diretor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.diretor}
              error={formik.errors.diretor}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="duracao"
              name="duracao"
              label="Duração (min)"
              type="number"
              value={formik.values.duracao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.duracao}
              error={formik.errors.duracao}
              min={0}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="genero"
              name="genero"
              label="Gênero"
              type="select"
              value={formik.values.genero}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.genero}
              error={formik.errors.genero}
              options={[
                { value: "", label: "Selecionar Gênero" },
                ...generos.map((genero) => ({ value: genero, label: genero })),
              ]}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="classificacao"
              name="classificacao"
              label="Selecionar Classificação"
              type="select"
              value={formik.values.classificacao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.classificacao}
              error={formik.errors.classificacao}
              options={[
                { value: "", label: "Selecione a classificação" },
                ...classificacoesEtarias.map((item) => ({
                  value: String(item.value),
                  label: item.label,
                })),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Linha 3: Grupo de Botões */}
      <div className="flex gap-5">
        <CustomButton
          type="button"
          label="Cancelar Ação"
          icon={<Ban size={18} />}
          variant="danger"
          className="flex-1"
          onClick={() => formik.resetForm()}
        />
        <CustomButton
          type="submit"
          label="Criar Filme"
          icon={<Plus size={18} />}
          variant="default"
          className="flex-1"
        />
      </div>
    </form>
  );
}
