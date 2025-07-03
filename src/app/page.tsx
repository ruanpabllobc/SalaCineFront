import FilmeForm from "@/components/FilmeForm";
import SalaForm from "@/components/SalaForm";
import SessaoForm from "@/components/sessaoForm";

export default function Home() {
  return (
    <main>
      <h1>Cadastro de Filmes</h1>
      <FilmeForm />
      <SalaForm />
      <SessaoForm />
    </main>
  );
}
