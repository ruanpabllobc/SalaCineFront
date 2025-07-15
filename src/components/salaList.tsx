"use client";

import { useEffect, useState } from "react";
import { Sala } from "@/types/Sala";
import { getSalas } from "@/services/salaService";

export default function SalaList() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const salasData = await getSalas(); // Usando o serviço importado
        setSalas(salasData);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  if (loading) return <div>Carregando salas...</div>;

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Número</th>
          <th>Local</th>
        </tr>
      </thead>
      <tbody>
        {salas.map((sala) => (
          <tr key={sala.id_sala}>
            <td>{sala.id_sala}</td>
            <td>{sala.numero_sala}</td>
            <td>{sala.local}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
