import SessaoForm from "@/components/SessaoForm";
import SessaoList from "@/components/SessaoList";

export default function SessaoPage() {
  return (
    <main className="p-4 flex flex-col gap-10">
      <SessaoForm />
      <SessaoList />
    </main>
  );
}
