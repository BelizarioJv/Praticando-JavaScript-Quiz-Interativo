import {
  questionsAnimalWord,
  questionsPopCulture,
  questionsScience,
  questionsGeography,
  questionsSports
} from './questions.js';

const themsesBtn = {
  animal: questionsAnimalWord,
  história: questionsPopCulture,
  ciencia: questionsScience,
  geografia: questionsGeography,
  esporte: questionsSports
};

const containerQuestions = document.querySelector(".questions");


function gerarPergunta(tema) {
  const perguntas = themsesBtn[tema];
  if (!perguntas) return;

  containerQuestions.innerHTML = "";

  const chaves = Object.keys(perguntas);
  const randomIndex = Math.floor(Math.random() * chaves.length);
  const perguntaSelecionada = perguntas[chaves[randomIndex]];

  const titulo = document.createElement("h2");
  titulo.textContent = perguntaSelecionada.pergunta;

  const dica = document.createElement("p");
  dica.textContent = "💡 Dica: " + perguntaSelecionada.dica;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Digite sua resposta:"
  input.id = "resposta";

  const botaoEnviar = document.createElement("button");
  botaoEnviar.textContent = "Enviar resposta";
  botaoEnviar.id = "submitBtn"

  botaoEnviar.addEventListener("click", () => {
    const respostaUsuario = input.value.trim().toUpperCase();
    const respostaCorreta = perguntaSelecionada.resposta.trim().toUpperCase();

    const resultado = document.createElement("h2");

    if (respostaUsuario === respostaCorreta) {
      resultado.textContent = "✅ Resposta correta!";
      containerQuestions.appendChild(resultado);

    
      setTimeout(() => {
        containerQuestions.innerHTML = "";
        gerarPergunta(tema);
      }, 2000);

    } else {
      resultado.textContent = "❌ Resposta incorreta.";
      containerQuestions.appendChild(resultado);

      setTimeout(() => {
        containerQuestions.removeChild(resultado);
      }, 2000);
    }
  });

  containerQuestions.appendChild(titulo);
  containerQuestions.appendChild(dica);
  containerQuestions.appendChild(input);
  containerQuestions.appendChild(botaoEnviar);
}


document.querySelectorAll(".themesBtn").forEach(botao => {
  botao.addEventListener("click", () => {
    const tema = botao.value;
    gerarPergunta(tema);
  });
});