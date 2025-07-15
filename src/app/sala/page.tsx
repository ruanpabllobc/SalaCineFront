import SalaForm from "@/components/SalaForm";
import SalaList from "@/components/salaList";

export default function SalaPage() {
  return (
    <main className="p-4 flex flex-col gap-10">
      <SalaForm />
      <SalaList />
    </main>
  );
}
