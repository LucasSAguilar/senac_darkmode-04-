const todosFilmes = [];

document
  .getElementById("filmeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const sinopse = document.getElementById("sinopse").value;
    const genero = document.getElementById("genero").value;
    const anoLancamento = document.getElementById("anoLancamento").value;
    const filmeId = document.getElementById("filmeId").value;

    const filmeData = {
      titulo,
      sinopse,
      genero,
      anoLancamento,
    };

    const method = filmeId ? "PUT" : "POST";
    const url = filmeId
      ? `http://localhost:8080/filme/${filmeId}`
      : "http://localhost:8080/filme";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filmeData),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar o filme");
      }

      const filmeProcessado = await response.json();
      console.log("Operação realizada com sucesso:", filmeProcessado);
      alert("Operação realizada com sucesso!");
      buscarFilmes();
    } catch (error) {
      console.error("Erro ao processar o filme:", error);
    }
    location.reload();
  });

async function buscarFilmes() {
  try {
    const response = await fetch("http://localhost:8080/filme");
    console.log(response);
    const filmes = await response.json();
    const lista = document.getElementById("filmes");
    lista.innerHTML = "";
    filmes.forEach((filme) => {
      todosFilmes.push(filme);
      const filmeItem = document.createElement("li");
      filmeItem.innerHTML = `<p data-id='${filme.id}' class='texto-filme'>Título: ${filme.titulo}, Gênero: ${filme.genero}, Ano: ${filme.anoLancamento} - Sinopse: ${filme.sinopse} <button class='btn-delete'>X</button></p>`;

      lista.appendChild(filmeItem);
    });
  } catch (error) {
    console.error("Erro ao buscar os filmes:", error);
  }
}

buscarFilmes();

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/analise")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Ocorreu um problema com a sua operação fetch: " + response.status
        );
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      const listaAnalises = document.querySelector("#listaAnalises");
      data.forEach((item) => {
        const avaliacaoItem = document.createElement("li");
        avaliacaoItem.innerHTML = `Filme: ${item.filme.titulo}, Nota: ${item.nota}, Análise: ${item.analise}`;
        listaAnalises.appendChild(avaliacaoItem);
      });
    })
    .catch((error) => console.error("Erro:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/filme")
    .then((response) => response.json())
    .then((filmes) => {
      const selectFilme = document.getElementById("filmeSelect");
      filmes.forEach((filme) => {
        const option = document.createElement("option");
        option.value = filme.id;
        option.textContent = filme.titulo;
        selectFilme.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar filmes:", error));
});

document
  .getElementById("formAnalise")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const filmeId = document.getElementById("filmeSelect").value;
    const comentario = document.getElementById("comentario").value;
    const nota = document.getElementById("nota").value;
    var objetoEnvio = {};

    todosFilmes.forEach((filme) => {
      if (filme.id == filmeId) {
        objetoEnvio = {
          id: Math.random() * 1000,
          filme: {
            id: filme.id,
            titulo: filme.titulo,
            sinopse: filme.sinopse,
            genero: filme.genero,
            anoLancamento: filme.anoLancamento,
          },
          analise: comentario,
          nota: nota,
        };
      }
    });

    fetch("http://localhost:8080/analise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objetoEnvio),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao enviar análise");
        }
        if (
          response.headers.get("content-length") === "0" ||
          !response.headers.get("content-type").includes("application/json")
        ) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Análise enviada com sucesso:", data);
          document.getElementById("formAnalise").reset();
        } else {
          console.log(
            "Análise enviada com sucesso, sem dados JSON na resposta."
          );
        }
        location.reload();
      })
      .catch((error) => {
        console.error("Erro ao enviar análise:", error);
      });
  });

$(document).on("click", ".btn-delete", function () {
  const id = $(this).data("id") || $(this).parent().data("id");
  $.ajax({
    url: `http://localhost:8080/filme/${id}`,
    type: "DELETE",
    success: function (result) {
      alert("Filme deletado com sucesso!");
      buscarFilmes();
      location.reload();
    },
    error: function (error) {
      console.error("Erro ao deletar o filme:", error);
    },
  });
});

$(document).on("click", ".btn-edit", function () {
  const id = $(this).parent().attr("href");
  $.ajax({
    url: `http://localhost:8080/filme/${id}`,
    type: "GET",
    success: function (result) {
      $("#titulo").val(result.titulo);
      $("#sinopse").val(result.sinopse);
      $("#genero").val(result.genero);
      $("#anoLancamento").val(result.anoLancamento);
      $("#filmeId").val(result.id);
    },

    error: function (error) {
      console.error("Erro ao buscar o filme:", error);
    },
  });
});

$(document).on("click", ".texto-filme", function (event) {
  event.preventDefault();

  const id = $(this).data("id") || $(this).parent().data("id");

  $.ajax({
    url: `http://localhost:8080/filme/${id}`,
    type: "GET",
    success: function (result) {
      $("#titulo").val(result.titulo);
      $("#sinopse").val(result.sinopse);
      $("#genero").val(result.genero);
      $("#anoLancamento").val(result.anoLancamento);
      $("#filmeId").val(result.id);
      $("#btn-enviar").text("Atualizar");
      $("#tituloPagina").text("Atualizar filme");
    },
    error: function (error) {
      console.error("Erro ao buscar o filme:", error);
    },
  });
});
