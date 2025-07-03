import FilmeForm from "@/components/FilmeForm";
import SalaForm from "@/components/SalaForm";

export default function Home() {
  return (
    <main>
      <h1>Cadastro de Filmes</h1>
      <FilmeForm />
      <SalaForm />
    </main>
  );
}
