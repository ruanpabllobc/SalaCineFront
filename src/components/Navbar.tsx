import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/sessao">Sessão</Link>
      <Link href="/filme">Filme</Link>
      <Link href="/sala">Sala</Link>
    </nav>
  );
}
