import { NextResponse, NextRequest } from "next/server";

type Filme = {
  id: number;
  titulo: string;
  ano: number;
  sinopse: string;
  imagem: string;
};

const filmes: Filme[] = [
  {
    id: 1,
    titulo: "Homem de Ferro",
    ano: 2008,
    sinopse:
      "Após ser sequestrado, o bilionário Tony Stark cria uma armadura de alta tecnologia para escapar e, depois, decide usá-la para combater o crime.",
    imagem:
      "https://m.media-amazon.com/images/S/pv-target-images/136bfedaefe209e50d9267664f50059e3de80d64e74d8e61078f7cb11dd87b16.jpg",
  },
];

export async function GET() {
  return NextResponse.json(filmes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.titulo || !body.ano || !body.sinopse) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: titulo, ano, sinopse" },
        { status: 400 }
      );
    }

    const novoId = filmes.length
      ? Math.max(...filmes.map((filme) => filme.id)) + 1
      : 1;

    const novoFilme: Filme = {
      id: novoId,
      titulo: body.titulo,
      ano: Number(body.ano),
      sinopse: body.sinopse,
      imagem: body.imagem || "",
    };

    filmes.push(novoFilme);

    return NextResponse.json(novoFilme, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar requisição" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const index = filmes.findIndex(filme => filme.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Filme não encontrado" }, { status: 404 });
  }

  filmes.splice(index, 1);
 return NextResponse.json({ message: "Filme deletado com sucesso" }, { status: 200 });
}