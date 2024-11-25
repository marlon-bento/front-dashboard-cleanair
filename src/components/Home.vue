<template>
  <div class="div-content">
    <Teleport to="#modal">
      <!-- use o componente de modal, passa a propriedade -->
      <ModalViewLaudos :laudo="dadosLaudo" :show="showModal" @close="showModal = false">

      </ModalViewLaudos>
    </Teleport>
    <!-- Modal usado para confirmar se realmente quer alterar status do laudo, se clicar em sim retorna um emit com parametro do laudo enviado, usado para encerra-lo -->
    <ModalConfirmaFinalStatus :laudoEnviado="modalConfirmaLaudo"
      @encerrar-laudo="(laudoEnviado) => encerrarLaudo(laudoEnviado)">

    </ModalConfirmaFinalStatus>


    <div class="my-3">
      <div class="">
        <div class="row row-deck row-cards">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center gap-1">
              <span>Exibir</span>
              <select ref="selectLimit" @change="changeLimit()" class="">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>resultados por página</span>
            </div>
            <div class="d-flex align-items-center gap-4">
              <div v-if="$route.path === '/' || $route.path === '/laudos_unidades'" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown"
                  data-bs-auto-close="outside" role="button" aria-expanded="false">
                  <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="svgs.menuFiltrarPorIcon">

                  </span>

                  <span class="nav-link-title">
                    Filtrar Sensor
                  </span>

                </a>
                <div class="dropdown-menu">
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      <div class="dropend">
                        <span @click.prevent="filter_temperatura">
                          <label class="dropdown-item cursor-pointer">
                            Temperatura
                          </label>
                        </span>
                        <span @click.prevent="filter_dioxido">
                          <label class="dropdown-item cursor-pointer">
                            Dióxido
                          </label>
                        </span>
                        <span @click.prevent="filter_umidade">
                          <label class="dropdown-item cursor-pointer">
                            Umidade
                          </label>
                        </span>
                        <span @click.prevent="filter_monoxido">
                          <label class="dropdown-item cursor-pointer">
                            Monóxido
                          </label>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-icon">
                <input ref="inputSearch" type="text" class="form-control" id="inputSearchLaudos" v-model="searchTerm"
                  placeholder="Buscar..." @input="filtrarLaudo">

                <span v-if="searchTerm" @click="cleanSearch()" class=" inputClose" v-html="svgs.inputClose"></span>
                <span v-else class="input-icon-addon" v-html="svgs.inputSearch"></span>
              </div>

            </div>



          </div>

          <table class="table" id="table-laudos">
            <thead>
              <tr>
                <th><input id="check-todos" class="form-check-input check-todos" type="checkbox"></th>
                <th>Medição</th>
                <th>Sensor</th>
                <th>Timestamp</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="(laudo, index) in laudos" :key="index">
                <td><input id="check-todos" class="form-check-input check-todos" type="checkbox"></td>
                <td>{{ laudo.value }}</td>
                <td>{{ laudo.sensor }}</td>
                <td>{{ formata_data(laudo.timestamp) }}</td>
              </tr>
            </tbody>
          </table>

          <span v-if="laudos.length === 0" class="display-6 text-center">
            Nenhum Sensor encontrado
          </span>
        </div>
      </div>

    </div>
  </div>


</template>

<script setup>
import { watch, ref, onMounted, reactive } from 'vue';
import axios from 'axios';

import { useLoginStore } from "@/stores/LoginStore";
import { useToastStore } from "@/stores/useToastStore";

import Pagination from '@/components/Pagination.vue';

//controle de modais
import ModalViewLaudos from '@/components/modals/ModalViewLaudos.vue';
import ModalConfirmaFinalStatus from '@/components/modals/ModalConfirmaFinalStatus.vue';
import * as apis from '@/assets/static/js/apis.js'; // Importando todas urls bases das apis usadas
const toastStore = useToastStore()

const showModal = ref(false)


const dadosLaudo = ref({})
const modalEncerraStatus = reactive({ modal: null })


// variaveis para uso no modal
function openModal(viewLaudo) {
  showModal.value = true
  dadosLaudo.value = viewLaudo
}
// watch(
//   () => showModal.value,
//   (newVal) => {
//     if (newVal) {

//        alert()
//     }
//   }
// );




// Estado local
const laudos = ref([]);
const searchTerm = ref('');
const page = ref(0);
const limit = ref(10);
const selectLimit = ref(10);
const totalLaudos = ref(0);
const inputSearch = ref('')


// prop para titulo e corpo do modal de confirma status
const modalConfirmaLaudo = ref({})

inputSearch.value
// Acessando o token do login
const loginStore = useLoginStore();
function formata_data(criacao) {
  let criado = new Date(criacao)
  let dia = criado.getDate()
  let mes = criado.getMonth() + 1
  let ano = criado.getFullYear()
  let hora = criado.getHours()
  let minutos = criado.getMinutes()

  if (dia < 10) {
    dia = "0" + dia
  }

  if (minutos < 10) {
    minutos = "0" + minutos
  }

  if (mes < 10) {
    mes = "0" + mes
  }

  if (hora < 10) {
    hora = "0" + hora
  }

  return `${dia}/${mes}/${ano} ${hora}:${minutos}`
}
function cleanSearch() {
  searchTerm.value = ""
  page.value = 0
  fetchLaudos()
}
function filtrarLaudo() {
  page.value = 0
  fetchLaudos()
}
function changeLimit() {
  page.value = 0
  limit.value = selectLimit.value.value
  fetchLaudos()
}
function changeStatus(laudoEnviado) {
  modalConfirmaLaudo.value = laudoEnviado

  modalEncerraStatus.modal.show()
}
async function encerrarLaudo(laudoEvidado) {
  try {
    let dadoAttStatus
    // encerra laudo de manutenção
    if (laudoEvidado.status === 'Aguardando-resposta') {
      dadoAttStatus = {
        status: "Concluido"
      }
      const response = await axios.patch(`${apis.baseLaudo}/api-laudo-manutencao/${laudoEvidado.id}/`, dadoAttStatus, {
        headers: { Authorization: `Bearer ${loginStore.token}` }
      })
      // atualiza as tabelas se der certo
      fetchLaudos()
    }
    //encerra laudo de devolução
    else if (laudoEvidado.status === 'em-progresso') {
      dadoAttStatus = {
        status: "Devolvido-ao-patrimonio"
      }
      const response = await axios.patch(`${apis.baseLaudo}/api-laudo-devolucao/${laudoEvidado.id}/`, dadoAttStatus, {
        headers: { Authorization: `Bearer ${loginStore.token}` }
      })
      // atualiza as tabelas se der certo
      fetchLaudos()
    }
    modalEncerraStatus.modal.hide()
  } catch (error) {
    alert("Por algum motivo não foi possível mudar o status, Tente novamente mais tarde")
  }

}
// Função para buscar laudos da API
const fetchLaudos = async () => {
  const filtro = searchTerm.value && searchTerm.value.trim() !== ""
    ? searchTerm.value.trim()
    : "DIOXIDO";
  const params = {
    sensor: filtro,
  };

  try {
    const response = await axios.get(apis.baseApiPish + '/sensores/sensodata', {
      params,
      headers: {
        Authorization: `Bearer ${loginStore.token}`,
      },
    });

    laudos.value = response.data;
    totalLaudos.value = response.data.length;


  } catch (error) {
    if (error.response.status == "500") {
      laudos.value = []
    }
    console.error('Erro ao buscar os laudos:', error);
  }
};

function filter_dioxido() {
  searchTerm.value = "DIOXIDO"
  fetchLaudos()
}
function filter_temperatura() {
  searchTerm.value = "TEMPERATURA"
  fetchLaudos()
}
function filter_umidade() {
  searchTerm.value = "UMIDADE"
  fetchLaudos()
}
function filter_monoxido() {
  searchTerm.value = "MONOXIDO"
  fetchLaudos()
}

// Chama fetchLaudos quando o componente é montado
onMounted(() => {

  /* Moatra o toast se ele estiver habilitado*/
  if (toastStore.use_toast) {
    toastStore.showToast(toastStore.content_toast)
  }

  fetchLaudos();

  // usado para abrir e fechar o modal
  modalEncerraStatus.modal = new bootstrap.Modal("#confirma-status")



});
</script>



<style scoped>
.limit-name {
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inputClose {
  color: var(--tblr-icon-color);
  z-index: 10;
  position: absolute;
  top: 50%;
  right: 0;

  transform: translateY(-50%);
  font-size: 1.2em;
  min-width: 2.5rem;
  display: flex;
  justify-content: center;

}

.inputClose:hover {
  cursor: pointer;


}
.div-content{
  
}
select {
  border: none;
  background-color: white;
}

[data-bs-theme=dark] select {
  background-color: rgb(51, 51, 51);
}
</style>