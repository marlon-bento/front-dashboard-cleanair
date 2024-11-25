<template>
  <div class="div-content ">

    <div className="controls mb-3 d-flex gap-3">
      <div>
        <span className="filtrar-por">Filtar por: </span>
        <select v-model="filtro">
          <option selected value="dia">Hoje</option>
          <option value="todo">Todo o histórico</option>
          <option value="ano">Anual</option>
          <option value="mes">Mensal</option>

        </select>
      </div>
      <div>
        <span className="filtrar-por">Quantidade: </span>
        <select v-model="quantidade">
          <option selected value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>


    <div class="d-flex gap-3 flex-wrap">
      <div class="card-sensores px-4 py-2">
        <h1 class="title-card-sensores mb-0">Temperatura</h1>
        <span>{{ dadosSensorTemperatura[0].value }} °C</span>
      </div>
      <div class="card-sensores px-4 py-2">
        <h1 class="title-card-sensores mb-0">Umidade</h1>
        <span>{{ dadosSensorUmidade[0].value }} %</span>
      </div>
      <div class="card-sensores px-4 py-2">
        <h1 class="title-card-sensores mb-0">Monóxido (CO) </h1>
        <span>{{ dadosSensorMonoxido[0].value }} ppm</span>
      </div>
      <div class="card-sensores px-4 py-2">
        <h1 class="title-card-sensores mb-0">Dióxido (CO²)</h1>
        <span>{{ dadosSensorDioxido[0].value }} ppm</span>
      </div>

      <!-- Gráfico -->

    </div>


    <div class="mt-5 row gx-3">
      <div class="col  ">
        <div class="card-usuario px-4 py-2 h-100 w-100">
          <h1 class="title-card-sensores mb-0">Bem vindo, novamente </h1>
          <span class="display-6" v-html="login.usuario"></span>
          <p> Que bom ver você de novo!
            Pergunte-me qualquer coisa.</p>
        </div>

      </div>


      <div class="col ">
        <div class="h-100 w-100 card-usuario d-flex flex-column py-2 px-4 ">
          <div class="">
            <h1 class="mb-0">CO</h1>
            <span class="title-card-sensores">Nível de aceitação</span>
          </div>
          <div class=" h-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <div class="gauge " ref="sensorCO">
              <svg width="200" height="200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#333" stroke-width="15" stroke-linecap="round">
                </circle>
                <circle cx="100" cy="100" r="90" fill="none" stroke="#00ff00" stroke-width="15" stroke-linecap="round"
                  stroke-dasharray="565.48" stroke-dashoffset="565.48"></circle> <!-- Borda que será controlada -->

              </svg>
              <span>

              </span>

            </div>
            <div class="content-dados-co d-flex  justify-content-between gap-5">
              <div class="d-flex flex-column align-items-center">
                <p>0%</p>
                <p>bom</p>
              </div>
              <div class="gauge-label d-flex flex-column align-items-center">
                <span id="gauge-value" ref="percentCO">0%</span>
                <p id="gauge-status" ref="statusCO"></p>
              </div>
              <div class="d-flex flex-column align-items-center">
                <p>100%</p>
                <p>Perigoso</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col">
        <div class="h-100 w-100 card-usuario d-flex flex-column py-2 px-4 ">
          <div class="">
            <h1 class="mb-0">Temperatura</h1>
          </div>
          <div class=" h-100 w-100 d-flex align-items-center justify-content-between">
            <div class="d-flex flex-column gap-3">
              <div>
                <div class="card-temperatura ps-2 pt-2">
                  <p class="mb-2">Temperatura ideal segundo OMS</p>
                  <span class="title-card-sensores" ref="mediaTemp">entre 23°C a 26°C</span>
                </div>
              </div>
              <div class="card-temperatura ps-2 pt-2">
                <p class="mb-2">Temperatura média</p>
                <span class="title-card-sensores" ref="mediaTemp"></span><span class="title-card-sensores">°C</span>
              </div>
              <div class="card-temperatura ps-2 pt-2">
                <p class="mb-2">Maior Temperatura</p>
                <span class="title-card-sensores" ref="maiorTemp"></span><span class="title-card-sensores">°C</span>
              </div>
            </div>
            <div class="gauge2 " ref="sensorCO">
              <svg width="200" height="200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#333" stroke-width="15" stroke-linecap="round">
                </circle>
                <circle cx="100" cy="100" r="90" fill="none" stroke="#00ff00" stroke-width="15" stroke-linecap="round"
                  stroke-dasharray="565.48" stroke-dashoffset="565.48"></circle> <!-- Borda que será controlada -->

              </svg>
              <div class="gauge-label2 d-flex flex-column align-items-center">
                <span id="gauge-value2" ref="percentCO">0%</span>
                <p id="gauge-status2" ref="statusCO"></p>
              </div>

            </div>

          </div>
        </div>
      </div>




    </div>
    <div class="row gx-3 mt-3">
      <div class="col">
        <div class="h-100 w-100 card-usuario d-flex flex-column py-2 px-4">
          <h1 class="">Dióxido</h1>
          <GraficoDioxido :dioxido="dadosSensorDioxido" :filtro="filtro"
            :quantidade="quantidade" />
        </div>
      </div>
      <div class="col">
        <div class="h-100 w-100 card-usuario d-flex flex-column py-2 px-4">
          <h1 class="">Temperatura X Umidade</h1>
          <GraficoUmidadeTemperatura :temperatura="dadosSensorTemperatura" :umidade="dadosSensorUmidade" :filtro="filtro"
            :quantidade="quantidade" />
        </div>
      </div>



    </div>


  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLoginStore } from "@/stores/LoginStore";
import axios from "axios"
import * as apis from '@/assets/static/js/apis.js'; // Importando todas urls bases das apis usadas
import GraficoDioxido from './graficos/GraficoDioxido.vue'
import GraficoUmidadeTemperatura from './graficos/GraficoUmidadeTemperatura.vue';
const login = useLoginStore()
// Registrar o componente globalmente se necessário
// Caso contrário, apenas importe e use localmente
// Certifique-se de ter instalado `vue3-apexcharts` no projeto:
// npm install vue3-apexcharts
const sensorCO = ref("")
const percentCO = ref("")
const statusCO = ref("")


const maiorTemp = ref("")
const mediaTemp = ref("")


const filtro = ref("dia")
const quantidade = ref("10")

const dadosSensorTemperatura = ref([{ value: "" }])
const dadosSensorDioxido = ref([{ value: "" }])
const dadosSensorMonoxido = ref([{ value: "" }])
const dadosSensorUmidade = ref([{ value: "" }])

async function fetchTemperatura() {
  try {
    const params = {
      sensor: "TEMPERATURA",
    };
    const response = await axios.get(apis.baseApiPish + '/sensores/sensodata', {
      params,
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    });
    dadosSensorTemperatura.value = response.data
    temperaturaGuage()


  } catch (error) {

  }

}

async function fetchDioxido() {
  try {
    const params = {
      sensor: "DIOXIDO",
    };
    const response = await axios.get(apis.baseApiPish + '/sensores/sensodata', {
      params,
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    });
    dadosSensorDioxido.value = response.data

  } catch (error) {

  }

}
async function fetchMonoxido() {
  try {
    const params = {
      sensor: "MONOXIDO",
    };
    const response = await axios.get(apis.baseApiPish + '/sensores/sensodata', {
      params,
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    });
    dadosSensorMonoxido.value = response.data
    const dados = dadosSensorMonoxido.value
    console.log(dados[0].value)
    coGauge(dados[0].value)
  } catch (error) {

  }

}
async function fetchUmidade() {
  try {
    const params = {
      sensor: "UMIDADE",
    };
    const response = await axios.get(apis.baseApiPish + '/sensores/sensodata', {
      params,
      headers: {
        Authorization: `Bearer ${login.token}`,
      },
    });
    dadosSensorUmidade.value = response.data

  } catch (error) {

  }

}
function timeOutFunc() {
  setInterval(async () => {
    await fetchTemperatura();
    await fetchMonoxido();
    await fetchDioxido();
    await fetchUmidade();
  }, 7000);
}
function coGauge(sensorValue) {
  const maxSensorValue = 1000; // Valor máximo do sensor
  let percentage = (sensorValue / maxSensorValue) * 100;
  let aux = percentage;

  // Limita a porcentagem a 78%
  if (percentage > 78) {
    aux = 78;
  }

  const value = document.getElementById('gauge-value');
  const status = document.getElementById('gauge-status');
  const gauge = document.querySelector('.gauge');  // Seletor para o gauge circular
  const circle = gauge.querySelector('circle:nth-child(2)'); // Seletor para o círculo preenchido
  const circleBase = gauge.querySelector('circle:nth-child(1)'); // Seletor para o círculo base (não preenchido)

  // Atualiza o valor do display
  value.textContent = `${Math.round(percentage)}%`;

  // Calcula a circunferência do círculo
  const circumference = 2 * Math.PI * circle.r.baseVal.value;  // Circunferência do círculo
  const dashoffset = circumference - (aux / 100) * circumference; // Preenchimento da borda

  // Atualiza a borda do círculo preenchido (gauge)
  circle.style.strokeDasharray = circumference; // Define o comprimento total da borda
  circle.style.strokeDashoffset = dashoffset;  // Define o quanto da borda preenchida é visível

  // Ajusta o círculo base (não preenchido), limitando a 78%
  circleBase.style.strokeDasharray = circumference; // Define o comprimento total da borda
  circleBase.style.strokeDashoffset = circumference - (78 / 100) * circumference; // Limita a base a 78%

  // Atualiza o status baseado no valor da porcentagem
  if (percentage <= 33) {
    circle.style.stroke = '#00ff00';  // Verde - muito bom
    status.textContent = 'Muito bom';
    status.style.color = '#00ff00';
  } else if (percentage <= 66) {
    circle.style.stroke = '#ffff00';  // Amarelo - aceitável
    status.textContent = 'Aceitável';
    status.style.color = '#ffff00';
  } else {
    circle.style.stroke = '#ff0000';  // Vermelho - ruim
    status.textContent = 'Ruim';
    status.style.color = '#ff0000';
  }
}

function temperaturaGuage() {
  const dados = dadosSensorTemperatura.value;
  if (Array.isArray(dados)) {
    // Calculando a soma
    let soma = 0;
    let maior = dados[0].value;

    dados.forEach(temp => {
      soma += temp.value;
      if (maior < temp.value) {
        maior = temp.value;
      }
    });

    // Calculando a média (simulado como 30 para debug)
    const media = soma / dados.length;

    // Atribuindo a média e maior valor à variável no DOM
    mediaTemp.value.innerHTML = media.toFixed(2);
    maiorTemp.value.innerHTML = maior;

    let percentage; // Declaração de variável

    // Cálculo de porcentagem em relação aos limites
    if (media < 23) {
      percentage = ((23 - media) / 23) * 100;
      console.log(`A temperatura média está ${percentage.toFixed(2)}% abaixo do ideal.`);
    } else if (media > 26) {
      percentage = ((media - 26) / 26) * 100;
      console.log(`A temperatura média está ${percentage.toFixed(2)}% acima do ideal.`);
    } else {
      percentage = 0;
      console.log("A temperatura média está dentro da faixa ideal (23-26).");
    }

    let aux = percentage;

    console.log(`Porcentagem: ${percentage}`);
    // Limita a porcentagem a 78%
    if (percentage > 78) {
      aux = 78;
    }

    const value = document.getElementById('gauge-value2');
    const status = document.getElementById('gauge-status2');
    const gauge = document.querySelector('.gauge2');  // Seletor para o gauge circular
    const circle = gauge.querySelector('circle:nth-child(2)'); // Seletor para o círculo preenchido
    const circleBase = gauge.querySelector('circle:nth-child(1)'); // Seletor para o círculo base (não preenchido)

    // Atualiza o valor do display
    value.textContent = `${Math.round(percentage)}%`;

    // Calcula a circunferência do círculo
    const circumference = 2 * Math.PI * circle.r.baseVal.value;  // Circunferência do círculo
    const dashoffset = circumference - (aux / 100) * circumference; // Preenchimento da borda

    // Atualiza a borda do círculo preenchido (gauge)
    circle.style.strokeDasharray = circumference; // Define o comprimento total da borda
    circle.style.strokeDashoffset = dashoffset;  // Define o quanto da borda preenchida é visível

    // Ajusta o círculo base (não preenchido), limitando a 78%
    circleBase.style.strokeDasharray = circumference; // Define o comprimento total da borda
    circleBase.style.strokeDashoffset = circumference - (78 / 100) * circumference; // Limita a base a 78%

    // Atualiza o status baseado no valor da porcentagem
    if (media > 26) {
      status.textContent = 'Acima da média';
      circle.style.stroke = '#ff0000';
      status.style.color = '#ff0000';
    } else if (media < 23) {
      status.textContent = 'Abaixo da média';
      status.style.color = '#ffff00';
      circle.style.stroke = '#ffff00';
    } else {
      status.textContent = 'Temperatura Ideal';
      circle.style.stroke = '#00ff00';  // Verde - muito bom
      status.style.color = '#00ff00';
    }

  } else {
    console.error("dados.value não é um array.");
  }
}

// Exemplo: Atualiza dinamicamente (substituir por leitura de sensor)
onMounted(async () => {


  await fetchTemperatura();
  await fetchMonoxido();
  await fetchDioxido();
  await fetchUmidade();

  timeOutFunc();

});

</script>

<style scoped>
.div-content {
  margin-bottom: 20px;


}

.card-temperatura {
  width: 230px;
  height: 70px;
  border-radius: 10px;
  background: linear-gradient(60deg, #22232b, #1a1f37b2) !important;
}

.card-sensores {
  width: 300px;
  height: 70px;
  border-radius: 10px;
  background: linear-gradient(60deg, #060b26, #1a1f37b2) !important;
}

.card-usuario {
  border-radius: 20px;
  background: linear-gradient(60deg, #060b26, #1a1f37b2) !important;
}

.title-card-sensores {
  color: #A0AEC0;
  font-size: 14px;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #1e1e2d;
  color: white;
  font-family: Arial, sans-serif;
}

.gauge {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.gauge svg {
  position: absolute;
  transform: rotate(-230deg);
  /* Roda o gráfico para que o preenchimento comece de cima */
}

.gauge2 {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.gauge2 svg {
  position: absolute;
  transform: rotate(40deg);
  /* Roda o gráfico para que o preenchimento comece de cima */
}

.content-dados-co {
  background: #111946;
  width: 80%;
  padding: 10px 40px;
  border-radius: 20px;
  margin-bottom: 20px;
}


#gauge-value {
  font-size: 1.5rem;
  font-weight: bold;
}

#gauge-value2 {
  font-size: 1.5rem;
  font-weight: bold;
}

#gauge-status {
  font-size: 1rem;
}
</style>
