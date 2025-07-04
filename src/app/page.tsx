import FilmeForm from "@/components/FilmeForm";
import SalaForm from "@/components/SalaForm";
import SessaoForm from "@/components/sessaoForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10">
      <FilmeForm />
      <SalaForm />
      <SessaoForm />
    </main>
  );
}
