import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div style={{cursor: 'pointer', textAlign: 'center'}} onClick={() => router.push(`/cursos/`)}>
      <h1>Ir a cursos</h1>
    </div>
  )
}