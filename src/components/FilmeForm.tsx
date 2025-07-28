"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createFilm, updateFilme } from "@/services/filmeService";
import { toast } from "react-toastify";
import FloatingLabelInput from "./FloatingLabelInput";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";
import FloatingLabelFileInput from "./FloatingLabelFileInput";
import MultiSelect from "./MultiSelect";
import { Filme } from "@/types/Filme";
import { useEffect } from "react";

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

interface FilmeFormProps {
  readonly filmeParaEditar?: Filme;
  readonly onSuccess?: () => void;
  readonly onCancel?: () => void;
}

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
  genero: Yup.array()
    .min(1, "Selecione pelo menos 1 gênero")
    .required("O gênero é obrigatório"),
  diretor: Yup.string()
    .max(100, "O diretor deve ter no máximo 100 caracteres")
    .required("O diretor é obrigatório"),
  poster: Yup.mixed<File>()
    .required("O poster é obrigatório") // Mensagem padronizada
    .test("fileSize", "A imagem é muito grande (máx. 2MB)", (file) => {
      if (!file) return false; // Agora o campo é obrigatório
      return file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Formato não suportado (use JPEG ou PNG)", (file) => {
      if (!file) return false;
      return ["image/jpeg", "image/png"].includes(file.type);
    }),
});

export default function FilmForm({
  filmeParaEditar,
  onSuccess,
  onCancel,
}: FilmeFormProps) {
  const isEditMode = Boolean(filmeParaEditar);

  const formik = useFormik({
    initialValues: {
      titulo: filmeParaEditar?.titulo || "",
      duracao: filmeParaEditar?.duracao || 0,
      classificacao: filmeParaEditar?.classificacao.toString() || "",
      genero: filmeParaEditar?.genero || [],
      diretor: filmeParaEditar?.diretor || "",
      poster: null as File | null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditMode && filmeParaEditar?.id_filme) {
          // Para edição - envia como JSON
          const payload = {
            titulo: values.titulo,
            duracao: Number(values.duracao),
            classificacao: Number(values.classificacao),
            diretor: values.diretor,
            generos: values.genero, // Note o plural aqui para bater com o backend
          };

          console.log("Enviando para atualização:", payload);

          const filmeAtualizado = await updateFilme(
            filmeParaEditar.id_filme,
            payload
          );
          toast.success(`Filme "${filmeAtualizado.titulo}" atualizado!`);
        } else {
          // Para criação - mantém FormData (para o poster)
          const formData = new FormData();
          formData.append("titulo", values.titulo);
          formData.append("duracao", String(values.duracao));
          formData.append("classificacao", values.classificacao);
          formData.append("diretor", values.diretor);
          formData.append("generos", JSON.stringify(values.genero));
          if (values.poster) formData.append("poster", values.poster);

          const filmeCriado = await createFilm(formData);
          toast.success(`Filme "${filmeCriado.titulo}" cadastrado!`);
        }

        resetForm();
        onSuccess?.();
      } catch (error) {
        console.error("Erro completo:", error);
        toast.error(
          isEditMode ? "Falha ao atualizar filme" : "Falha ao cadastrar filme"
        );
      }
    },
  });

  useEffect(() => {
    if (filmeParaEditar) {
      formik.setValues({
        titulo: filmeParaEditar.titulo,
        duracao: filmeParaEditar.duracao,
        classificacao: filmeParaEditar.classificacao.toString(),
        genero: filmeParaEditar.genero || [], // Corrigido para plural
        diretor: filmeParaEditar.diretor,
        poster: null, // Mantemos null para o poster, o usuário pode substituir
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmeParaEditar]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[750px] mx-auto px-5 pb-5 flex flex-col gap-10"
      style={{ paddingTop: "0px" }}
    >
      {/* Linha 1: Grupo de Texto*/}
      <div className="text-center">
        <h2 className="text-2xl">
          {isEditMode ? "Editar Filme" : "Adicionar Filme"}
        </h2>
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
        {/* Linha 3: Grupo de Botões
          <div className="flex-1">
          <FloatingLabelInput
          id="genero"
          name="genero"
          label="Selecionar Gênero"
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
            */}

        <div className="flex gap-5">
          <div className="flex-1 max-w-[350px]">
            <MultiSelect
              id="genero"
              name="genero"
              label="Selecione os gêneros"
              value={formik.values.genero}
              onChange={(selected) => formik.setFieldValue("genero", selected)}
              onBlur={() => formik.setFieldTouched("genero", true)}
              options={generos}
              touched={!!formik.touched.genero}
              error={
                typeof formik.errors.genero === "string"
                  ? formik.errors.genero
                  : undefined
              }
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

        <div>
          <div className="flex-1">
            <FloatingLabelFileInput
              id="poster"
              name="poster"
              label="Poster do Filme"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] ?? null;
                formik.setFieldValue("poster", file);
              }}
              onBlur={formik.handleBlur}
              touched={formik.touched.poster}
              error={formik.errors.poster as string}
              accept="image/jpeg, image/png"
              fileName={formik.values.poster?.name || ""}
              success={Boolean(formik.values.poster && !formik.errors.poster)}
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
          onClick={() => {
            formik.resetForm();
            onCancel?.();
          }}
        />
        <CustomButton
          type="submit"
          label={isEditMode ? "Atualizar Filme" : "Criar Filme"}
          icon={<Plus size={18} />}
          variant="default"
          className="flex-1"
        />
      </div>
    </form>
  );
}
