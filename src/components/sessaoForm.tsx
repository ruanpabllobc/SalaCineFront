"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSessao } from "@/services/sessaoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      filme: 0,
      sala: 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataHoraFormatada = values.data_hora + ":00";
        const sessaoCriada = await createSessao({
          data_hora: dataHoraFormatada,
          id_filme: values.filme,
          id_sala: values.sala,
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="filme">ID do Filme</label>
        <input
          id="filme"
          name="filme"
          type="number"
          value={formik.values.filme}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.filme && formik.errors.filme ? (
          <div style={{ color: "red" }}>{formik.errors.filme}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="sala">ID da Sala</label>
        <input
          id="sala"
          name="sala"
          type="number"
          value={formik.values.sala}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.sala && formik.errors.sala ? (
          <div style={{ color: "red" }}>{formik.errors.sala}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="data_hora">Data e Hora</label>
        <input
          id="data_hora"
          name="data_hora"
          type="datetime-local"
          value={formik.values.data_hora}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          min={new Date().toISOString().slice(0, 16)} // Define o mínimo como o momento atual
        />
        {formik.touched.data_hora && formik.errors.data_hora ? (
          <div style={{ color: "red" }}>{formik.errors.data_hora}</div>
        ) : null}
      </div>

      <button type="submit">Cadastrar Sessão</button>
    </form>
  );
}
