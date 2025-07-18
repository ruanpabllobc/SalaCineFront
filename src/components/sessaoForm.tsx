"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSessao } from "@/services/sessaoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "./FloatingLabelInput";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";

const validationSchema = Yup.object().shape({
  filme: Yup.number()
    .integer("O ID do filme deve ser um número inteiro")
    .min(1, "O ID do filme deve ser pelo menos 1")
    .required("O ID do filme é obrigatório"),
  sala: Yup.number()
    .integer("O ID da sala deve ser um número inteiro")
    .min(1, "O ID da sala deve ser pelo menos 1")
    .required("O ID da sala é obrigatório"),
  data_hora: Yup.date()
    .required("A data e hora são obrigatórias")
    .min(new Date(), "A data e hora devem ser no futuro"),
});

export default function SessaoForm() {
  const formik = useFormik({
    initialValues: {
      data_hora: "",
      filme: "",
      sala: "",
    },
    validationSchema,
    // Em SessaoForm.tsx, dentro de onSubmit:
    onSubmit: async (values, { resetForm }) => {
      try {
        const selectedDateTime = new Date(values.data_hora);

        if (isNaN(selectedDateTime.getTime())) {
          toast.error("Data e hora selecionadas são inválidas.");
          return;
        }

        const dataHoraFormatada = selectedDateTime.toISOString();

        const sessaoCriada = await createSessao({
          data_hora: dataHoraFormatada,
          filme_id: Number(values.filme), // <-- Mude de id_filme para filme_id
          sala_id: Number(values.sala), // <-- Mude de id_sala para sala_id
        });
        toast.success(
          `Sessão criada com sucesso! ID: ${sessaoCriada.id_sessao}`,
        );
        resetForm();
      } catch (error) {
        console.error("Erro ao criar sessão:", error);
        toast.error("Falha ao criar sessão");
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
        <h2 className="text-2xl">Adicionar Sessão</h2>
        <h3 className="text-[#969696] text-lg">
          Escolha um filme e adicione uma nova sessão
        </h3>
      </div>

      {/* Linha 2: Grupo de Inputs */}
      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="filme"
              name="filme"
              label="ID do Filme"
              type="number"
              value={formik.values.filme}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.filme}
              error={formik.errors.filme}
              min={1}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="sala"
              name="sala"
              label="ID da Sala"
              type="number"
              value={formik.values.sala}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.sala}
              error={formik.errors.sala}
              min={1}
            />
          </div>
        </div>
        <div>
          <FloatingLabelInput
            id="data_hora"
            name="data_hora"
            label="Data e Hora"
            type="datetime-local"
            value={formik.values.data_hora}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.data_hora}
            error={formik.errors.data_hora}
          />
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
          label="Criar Sessão"
          icon={<Plus size={18} />}
          variant="default"
          className="flex-1"
        />
      </div>
    </form>
  );
}
