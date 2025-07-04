"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSala } from "@/services/salaService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "./FloatingLabelInput";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";

const classificacoesEtarias = [
  { value: 0, label: "Livre" },
  { value: 10, label: "10 Anos" },
  { value: 12, label: "12 Anos" },
  { value: 14, label: "14 Anos" },
  { value: 16, label: "16 Anos" },
  { value: 18, label: "18 Anos" },
];

const validationSchema = Yup.object().shape({
  numero_sala: Yup.number()
    .integer("O número da sala deve ser um inteiro")
    .min(1, "O número da sala deve ser pelo menos 1")
    .required("O número da sala é obrigatório"),
  local: Yup.string()
    .max(100, "A localização deve ter no máximo 100 caracteres")
    .required("A localização é obrigatória"),
  classificacao: Yup.number()
    .integer("A classificação deve ser um número inteiro")
    .min(0, "A classificação mínima é 0")
    .max(18, "A classificação máxima é 18")
    .required("A classificação é obrigatória"),
});

export default function SalaForm() {
  const formik = useFormik({
    initialValues: {
      numero_sala: "",
      local: "",
      classificacao: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataToSend = {
          ...values,
          numero_sala: Number(values.numero_sala),
          classificacao: Number(values.classificacao),
        };
        const salaCriada = await createSala(dataToSend);
        toast.success(
          `Sala ${salaCriada.numero_sala} cadastrada! ID: ${salaCriada.id_sala}`
        );
        resetForm();
      } catch (error) {
        console.error("Erro ao criar sala:", error);
        toast.error("Falha ao cadastrar sala");
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
        <h2 className="text-2xl">Adicionar Sala</h2>
        <h3 className="text-[#969696] text-lg">
          Adicione uma nova sala ao cinema
        </h3>
      </div>

      {/* Linha 2: Grupo de Inputs */}
      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="numero_sala"
              name="numero_sala"
              label="Número da Sala"
              type="number"
              value={formik.values.numero_sala}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.numero_sala}
              error={formik.errors.numero_sala}
              min={1}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="classificacao"
              name="classificacao"
              label="Classificação"
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
          <FloatingLabelInput
            id="local"
            name="local"
            label="Localização da sala"
            value={formik.values.local}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.local}
            error={formik.errors.local}
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
          label="Criar Sala"
          icon={<Plus size={18} />}
          variant="default"
          className="flex-1"
        />
      </div>
    </form>
  );
}
