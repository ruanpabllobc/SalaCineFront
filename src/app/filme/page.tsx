import FilmeForm from "@/components/FilmeForm";
import FilmeList from "@/components/FilmeList";

export default function FilmePage() {
  return (
    <main className="p-4 flex flex-col gap-10">
      <FilmeForm />
      <FilmeList />
    </main>
  );
}
