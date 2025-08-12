"use client";
import { useEffect, useState } from "react";

type Filme = {
  id: number;
  titulo: string;
  ano: number;
  sinopse: string;
  imagem?: string;
};

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [novoFilme, setNovoFilme] = useState({titulo: "",ano: "",sinopse: "",imagem: "",
  });

  useEffect(() => {
    fetch("/api/filmes")
      .then((response) => response.json())
      .then((data) => setFilmes(data))
      .catch((err) => console.error("Erro ao buscar filmes:", err));
  }, []);

  // Função para enviar um novo filme para API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFilme),
      });
      if (!response.ok) {
        const err = await response.json();
        alert(err.error || "Erro ao adicionar filme");
        return;
      }

      const filmeAdicionado = await response.json();
      setFilmes((prev) => [...prev, filmeAdicionado]);

      setNovoFilme({ titulo: "", ano: "", sinopse: "", imagem: "" });
    } catch (error) {
      console.log("Erro ao adicionar filme:");
    }
  };
  
  // Função para deletar um filme na API

  const DeletarFilme = async (id: number) => {
    const response = await fetch("/api/filmes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const err = await response.json();
      alert(err.error || "Erro ao deletar filme");
      return;
    }
    setFilmes((prev) => prev.filter((filme) => filme.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-10 italic font-sans">
        Filmes Adicionados
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-5">
        {filmes.map((filme) => (
          <div key={filme.id} className="border rounded-lg shadow p-4">
            <img
              src={filme.imagem}
              alt={filme.titulo}
              className="w-full object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{filme.titulo}</h2>
            <p className="text-gray-500">
              <span>Ano:</span> {filme.ano}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-bold">Sinopse:</span> {filme.sinopse}
            </p>
            <button
              onClick={() => DeletarFilme(filme.id)}
              className="rounded full bg-red-500 text-white cursor-pointer px-2 mt-2"
            >
              X
            </button>
          </div>
        ))}
      </div>
       <div className="container mx-auto flex justify-between sm:w-sm md:w-md max-md:flex-col lg:w-3xl mb-5 mt-15 gap-10">
        <div className="text-2xl font-semibold mb-5 grid justify-center tex-center w-full">
          <p className="px-2 italic text-md rounded-lg bg-blue-600 text-white text-center">Adicione um Novo Filme</p>
          <img className="rounded-full mt-5 object-cover" src="https://static.vecteezy.com/system/resources/previews/035/868/900/non_2x/illustration-of-upload-vector.jpg" width={250} height={50} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="border p-10 rounded-lg flex flex-col w-full shadow bg-gray-50">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Título"
              value={novoFilme.titulo}
              onChange={(e) => setNovoFilme({ ...novoFilme, titulo: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Ano"
              value={novoFilme.ano}
              onChange={(e) => setNovoFilme({ ...novoFilme, ano: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
              required
            />
          </div>
          <textarea
            placeholder="Sinopse"
            value={novoFilme.sinopse}
            onChange={(e) => setNovoFilme({ ...novoFilme, sinopse: e.target.value })
            }
            className="border p-2 w-full mb-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="URL da imagem"
            value={novoFilme.imagem}
            onChange={(e) => setNovoFilme({ ...novoFilme, imagem: e.target.value })
            }
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
