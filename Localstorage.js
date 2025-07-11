const input = document.getElementById("tituloNota")
const btnAdicionar = document.getElementById("btnAdicionar")
const lista = document.getElementById("listaNotas")

function carregarNotas() {
  lista.innerHTML = ""
  const notas = JSON.parse(localStorage.getItem("notas")) || []

  notas.forEach((nota, index) => {
    const li = document.createElement("li")
    li.textContent = nota.titulo

    const btnRemover = document.createElement("button")
    btnRemover.textContent = "Remover"
    btnRemover.style.marginLeft = "10px"

    btnRemover.addEventListener("click", () => {
      removerNota(index)
    })

    li.appendChild(btnRemover)
    lista.appendChild(li)
  })
}

function adicionarNota() {
  const titulo = input.value.trim()
  if (titulo === "") return

  const notas = JSON.parse(localStorage.getItem("notas")) || []

  const tituloExistente = notas.some(nota => nota.titulo === titulo)
  if (tituloExistente) {
    alert("Título já existe. Escolha outro.")
    return
  }

  notas.push({ titulo })
  localStorage.setItem("notas", JSON.stringify(notas))

  input.value = ""
  carregarNotas()
}

function removerNota(index) {
  const notas = JSON.parse(localStorage.getItem("notas")) || []
  notas.splice(index, 1)
  localStorage.setItem("notas", JSON.stringify(notas))
  carregarNotas()
}

btnAdicionar.addEventListener("click", adicionarNota)
window.addEventListener("load", carregarNotas)
