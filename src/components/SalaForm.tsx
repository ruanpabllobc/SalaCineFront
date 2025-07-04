"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSala } from "@/services/salaService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      numero_sala: 0,
      local: "",
      classificacao: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const salaCriada = await createSala(values);
        toast.success(
          `Sala ${salaCriada.numero_sala} cadastrada! ID: ${salaCriada.id_sala}`,
        );
        resetForm();
      } catch (error) {
        console.error("Erro ao criar sala:", error);
        toast.error("Falha ao cadastrar sala");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="numero_sala">Número da Sala</label>
        <input
          id="numero_sala"
          name="numero_sala"
          type="number"
          value={formik.values.numero_sala}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.numero_sala && formik.errors.numero_sala ? (
          <div style={{ color: "red" }}>{formik.errors.numero_sala}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="local">Localização</label>
        <input
          id="local"
          name="local"
          type="text"
          value={formik.values.local}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.local && formik.errors.local ? (
          <div style={{ color: "red" }}>{formik.errors.local}</div>
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

      <button type="submit">Cadastrar Sala</button>
    </form>
  );
}
