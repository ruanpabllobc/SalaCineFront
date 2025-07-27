"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSessao } from "@/services/sessaoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingLabelInput from "./FloatingLabelInput";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";
import { useEffect, useState } from "react";
import { Filme } from "@/types/Filme";
import { Sala } from "@/types/Sala";
import { getFilmes } from "@/services/filmeService";
import { getSalas } from "@/services/salaService";

const validationSchema = Yup.object().shape({
  filme: Yup.number()
    .min(1, "Selecione um filme")
    .required("Selecione um filme"),
  sala: Yup.number()
    .min(1, "Selecione uma sala")
    .required("Selecione uma sala"),
  data_hora: Yup.date()
    .required("A data e hora são obrigatórias")
    .min(new Date(), "A data e hora devem ser no futuro"),
});

export default function SessaoForm() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmesData, salasData] = await Promise.all([
          getFilmes(),
          getSalas(),
        ]);
        setFilmes(filmesData);
        setSalas(salasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        toast.success("Dados carregados com sucesso!");
      }
    };

    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      data_hora: "",
      filme: "",
      sala: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataHoraFormatada = new Date(values.data_hora).toISOString();

        console.log("Dados sendo enviados:", {
          // 👈 Adicione isso
          data_hora: dataHoraFormatada,
          filme_id: Number(values.filme),
          sala_id: Number(values.sala),
        });

        const sessaoCriada = await createSessao({
          data_hora: dataHoraFormatada,
          filme_id: Number(values.filme),
          sala_id: Number(values.sala),
        });

        console.log("Resposta da API:", sessaoCriada); // 👈 Adicione isso

        // Se chegou aqui, a sessão foi criada!
        toast.success("Sessão criada com sucesso!");
        resetForm();
      } catch (error) {
        console.error("Erro completo:", error); // 👈 Mostra detalhes reais
        toast.error(
          "Falha ao criar sessão: " +
            (error instanceof Error ? error.message : "Erro desconhecido")
        );
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
              label="Filme"
              type="select"
              value={formik.values.filme}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.filme}
              error={formik.errors.filme}
              options={filmes.map((filme) => ({
                value:
                  filme.id_filme !== undefined ? filme.id_filme.toString() : "",
                label: `${filme.titulo}`,
              }))}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="sala"
              name="sala"
              label="Sala"
              type="select"
              value={formik.values.sala}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.sala}
              error={formik.errors.sala}
              options={salas.map((sala) => ({
                value:
                  sala.id_sala !== undefined ? sala.id_sala.toString() : "",
                label: `Sala ${sala.numero_sala} - ${sala.local}`,
              }))}
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
