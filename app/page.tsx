import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Button asChild>
          <Link href="/upload">Ir a la pagina de upload</Link>
        </Button>
      </div>
    </>
  );
}
