import Content from "@/Components/Content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmes Online",
  description: "Venha assistir todos os filmes que você quiser",
  keywords: ["filmes", "assistir filmes", "filmes online", "filmes grátis"],
};
export default function Home() {
  return (
    <>
    <Content />
    </>
  );
}
