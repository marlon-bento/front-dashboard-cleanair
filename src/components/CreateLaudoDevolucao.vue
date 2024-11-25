<script setup>
//stores
import { useLoginStore } from "@/stores/LoginStore";
import { useToastStore } from "@/stores/useToastStore";

import { ref, onMounted } from "vue";
import axios from 'axios'

import { useRouter } from 'vue-router';
import * as apis from '@/assets/static/js/apis.js'; // Importando todas urls bases das apis usadas
// Suponha que `item` seja um objeto com as informações do livro

const router = useRouter()

const toastStore = useToastStore()
function goToHome() {
    toastStore.enableToast()
    toastStore.content_toast = {
        title: "Processo Finalizado!",
        body: "Laudo de Devolução criado com sucesso"
    }
    router.push({ name: 'home' })
}
const login = useLoginStore()

const dataIntitutos = ref([])

//todos campos
const inputName = ref("")
const inputEmail = ref("")
const inputUnidade = ref("")
const inputInstituto = ref("")
const inputSetor = ref("")
const inputNumChamdo = ref("")
const inputPredio = ref("")
const inputSala = ref("")
const inputRamal = ref("")
const inputEquipamento = ref("")
const inputStatus = ref("")
const inputNumSerie = ref("")
const inputPatrimonio = ref("")
const inputMarca = ref("")
const inputModelo = ref("")
const inputTipoDevolucao = ref("")
const inputObservacoes = ref("")

// controle de mensagens de inputs
const mensagemName = ref("")
const mensagemEmail = ref("")
const mensagemUnidade = ref("")
const mensagemInstituto = ref("")
const mensagemPredio = ref("")
const mensagemRamal = ref("")
const mensagemEquipamento = ref("")
const mensagemStatus = ref("")
const mensagemNumSerie = ref("")
const mensagemMarca = ref("")
const mensagemModelo = ref("")
const mensagemTipoDevolucao = ref("")
const mensagemObservacoes = ref("")


async function getInstitutos() {
    try {
        const dados = await axios.get(apis.baseLaudo + '/api-institutos/',
            {
                headers: {
                    Authorization: `Bearer ${login.token}`
                }
            }

        )
        dataIntitutos.value = dados.data
    } catch (error) {
        console.log(error)
    }
}
async function enviarDados() {
    console.log("entrei no enviar dados")
    // zera as mensagens de erro se o input estiver correto para enviar
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputName.value !== "") {
        mensagemName.value.innerHTML = ""
    }
    if (inputEmail.value !== "") {
        mensagemEmail.value.innerHTML = ""
    }
    if (regexEmail.test(inputEmail.value)) {
        mensagemEmail.value.innerHTML = ""
    }
    if (inputUnidade.value !== "") {
        mensagemUnidade.value.innerHTML = ""
    }
    if (inputInstituto.value !== "") {
        mensagemInstituto.value.innerHTML = ""
    }
    if (inputPredio.value !== "") {
        mensagemPredio.value.innerHTML = ""
    }
    if (inputRamal.value !== "") {
        mensagemRamal.value.innerHTML = ""
    }
    if (inputEquipamento.value !== "") {
        mensagemEquipamento.value.innerHTML = ""
    }
    if (inputStatus.value !== "") {
        mensagemStatus.value.innerHTML = ""
    }
    if (inputNumSerie.value !== "") {
        mensagemNumSerie.value.innerHTML = ""
    }
    if (inputMarca.value !== "") {
        mensagemMarca.value.innerHTML = ""
    }
    if (inputModelo.value !== "") {
        mensagemModelo.value.innerHTML = ""
    }
    if (inputTipoDevolucao.value !== "") {
        mensagemTipoDevolucao.value.innerHTML = ""
    }
    if (inputObservacoes.value !== "") {
        mensagemObservacoes.value.innerHTML = ""
    }







    /* se todos os inputs estão certos e os que obrigatórios não vazios permite a criação*/
    if (inputName.value !== "" && /*verifica se o input está vazio*/
        inputEmail.value !== "" && /*verifica se o input está vazio*/
        regexEmail.test(inputEmail.value) && /*verifica se o email está no padrão correto*/
        inputUnidade.value !== "" && /*verifica se o input está vazio*/
        inputInstituto.value !== "" && /*verifica se o input está vazio*/
        inputPredio.value !== "" && /*verifica se o input está vazio*/
        inputRamal.value !== "" && /*verifica se o input está vazio*/
        inputEquipamento.value !== "" && /*verifica se o input está vazio*/
        inputStatus.value !== "" && /*verifica se o input está vazio*/
        inputNumSerie.value !== "" && /*verifica se o input está vazio*/
        inputMarca.value !== "" && /*verifica se o input está vazio*/
        inputModelo.value !== "" && /*verifica se o input está vazio*/
        inputTipoDevolucao.value !== "" && /*verifica se o input está vazio*/
        inputObservacoes.value !== "" /*verifica se o input está vazio*/) {
        
        
        try {
            console.log("entrei no try")
            const dadosLaudo =
            {
                nome_solicitante: inputName.value,
                email_solicitante: inputEmail.value,
                instituto: inputInstituto.value,
                setor: inputSetor.value,
                num_predio: inputPredio.value,
                num_ramal: inputRamal.value,
                tipo_equip: inputEquipamento.value,
                num_serie: inputNumSerie.value,
                marca: inputMarca.value,
                modelo: inputModelo.value,
                observacoes: inputObservacoes.value,
                patrimonio: inputPatrimonio.value,
                num_sala: inputSala.value,
                num_chamado: inputNumChamdo.value,
                tipo_baixa: inputTipoDevolucao.value,
                status: inputStatus.value
            }
            const response =  await axios.post(apis.baseLaudo+"/api-laudo-devolucao/", dadosLaudo,            {
                headers: {
                    Authorization: `Bearer ${login.token}`
                }
            })
            // depois de criar com sucesso volta para a home e mostra um toast de sucesso
            goToHome()
        } catch (error) {
            console.log(error)
        }
    }else {
        // exibir mensagem de erro
        if (inputName.value === "") {
            mensagemName.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputEmail.value === "") {
            mensagemEmail.value.innerHTML = "Este campo não pode estar vazio"
        } else if (!regexEmail.test(inputEmail.value)) {
            mensagemEmail.value.innerHTML = "Email invalido"
        }

        if (inputUnidade.value === "") {
            mensagemUnidade.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputInstituto.value === "") {
            mensagemInstituto.value.innerHTML = "Selecione um instituto"
        }
        if (inputPredio.value === "") {
            mensagemPredio.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputRamal.value === "") {
            mensagemRamal.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputEquipamento.value === "") {
            mensagemEquipamento.value.innerHTML = "Selecione um equipamento"
        }
        if (inputStatus.value === "") {
            mensagemStatus.value.innerHTML = "Selecione um Status"
        }
        if (inputNumSerie.value === "") {
            mensagemNumSerie.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputMarca.value === "") {
            mensagemMarca.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputModelo.value === "") {
            mensagemModelo.value.innerHTML = "Este campo não pode estar vazio"
        }
        if (inputTipoDevolucao.value === "") {
            mensagemTipoDevolucao.value.innerHTML = "Selecione um tipo de devolução"
        }
        if (inputObservacoes.value === "") {
            mensagemObservacoes.value.innerHTML = "Este campo não pode estar vazio"
        }
    }

}
onMounted(async () => {
    inputName.value = login.last_name
    inputEmail.value = login.email
    inputUnidade.value = login.user_profile.unidade
    await getInstitutos();
    console.log(dataIntitutos.value)

})
</script>
<template>
    <form class="mt-2" action="">
        <h1 class="title-form">Processo de Devolução de Bem</h1>
        <div class="page-body">
            <div class="container-xl">
                <div class="card">
                    <div class="card-body">
                        <h1 class="title-form">Laudo Técnico</h1>
                        <div class="row row-cards">
                            <div class="col-sm-6 col-md-6">
                                <label class="form-label required">Nome do Solicitante</label>
                                <div class="input-icon">
                                    <span class="input-icon-addon" v-html="svgs.avatarInput"></span>
                                    <input v-model="inputName" type="text" name="nome_solicitante" maxlength="128"
                                        required="" id="id_nome_solicitante" class="form-control"
                                        placeholder="Nome do Solicitante">
                                </div>
                                <span ref="mensagemName" class="text-danger"></span>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3 ">
                                    <label class="form-label required">Email do Solicitante</label>
                                    <div class="input-icon ">
                                        <span class="input-icon-addon" v-html="svgs.mensagemInput"></span>
                                        <input v-model="inputEmail" type="email" name="email_solicitante"
                                            maxlength="254" required="" id="id_email_solicitante" class="form-control"
                                            placeholder="Email do Solicitante">
                                    </div>

                                    <span ref="mensagemEmail" class="text-danger"></span>
                                    <span id="erroEmail" class="text-danger hidden">Email inválido</span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="md-3">
                                    <label class="form-label required">Unidade</label>
                                    <div class="hidden">
                                        <input type="text" class="form-control" value="UNID. EDUC. SÃO GABRIEL - PSG"
                                            disabled="">
                                    </div>
                                    <input v-model="inputUnidade" type="text" class="form-control" disabled>
                                    <span ref="mensagemUnidade" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="md-3">
                                    <label class="form-label required">Instituto</label>
                                    <select v-model="inputInstituto" name="" required="" id="" class="form-select">
                                        <option value="" selected disabled hidden>Selecione um instituto</option>
                                        <option v-for="(item, index) in dataIntitutos" :key="index" :value="item.id">
                                            {{ item.nome }}
                                        </option>
                                    </select>
                                    <span ref="mensagemInstituto" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="md-3">
                                    <label class="form-label">Setor</label>
                                    <input v-model="inputSetor" type="text" name="setor" maxlength="128" required=""
                                        id="id_setor" class="form-control" placeholder="Nome Setor">
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label ">Número do Chamado</label>
                                    <input v-model="inputNumChamdo" type="number" name="num_chamado" maxlength="14"
                                        id="id_num_chamado" class="form-control" placeholder="Número do CSC">
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Prédio</label>
                                    <input v-model="inputPredio" type="number" name="num_predio" required=""
                                        id="id_num_predio" class="form-control" placeholder="Número do Prédio"
                                        :maxlength="10">
                                    <span ref="mensagemPredio" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label">Sala</label>
                                    <input v-model="inputSala" type="text" name="num_sala" maxlength="20"
                                        id="id_num_sala" class="form-control" placeholder="Número da Sala">
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Ramal</label>
                                    <input v-model="inputRamal" type="number" name="num_ramal" required=""
                                        id="id_num_ramal" class="form-control" placeholder="Número do Ramal">
                                    <span ref="mensagemRamal" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                        <h1 class="title-form" style="margin-top: 20px;">Dados Do Equipamento</h1>
                        <div class="row row-cards">
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Equipamento</label>
                                    <select v-model="inputEquipamento" name="tipo_baixa" id="id_tipo_baixa"
                                        class="form-select">
                                        <option value="" selected disabled hidden>Selecione o tipo de equipamento
                                        </option>
                                        <option value="Computador">Computador</option>
                                        <option value="Monitor">Monitor</option>
                                        <option value="Notebook">Notebook</option>
                                        <option value="Switch">Switch</option>
                                        <option value="Projetor">Projetor</option>
                                        <option value="Impressora">Impressora</option>
                                        <option value="Instrumento de Testes">Instrumento de Testes</option>

                                    </select>
                                    <span ref="mensagemEquipamento" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Status</label>
                                    <select v-model="inputStatus" name="status" required="" id="id_status"
                                        class="form-select">
                                        <option value="" selected disabled hidden>Selecione o status do laudo</option>

                                        <option value="em-progresso">Em Progresso</option>

                                        <option value="Devolvido-ao-patrimonio">Devolvido ao Patrimônio</option>

                                    </select>
                                    <span ref="mensagemStatus" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Número de Seríe</label>
                                    <input v-model="inputNumSerie" type="text" name="num_serie" maxlength="128"
                                        required="" id="id_num_serie" class="form-control"
                                        placeholder="Número de Série">
                                    <span ref="mensagemNumSerie" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label">Patrimônio</label>
                                    <input v-model="inputPatrimonio" type="number" name="patrimonio" maxlength="14"
                                        id="id_patrimonio" class="form-control" placeholder="Número do Patrimônio">
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Marca</label>
                                    <input v-model="inputMarca" type="text" name="marca" maxlength="55" required=""
                                        id="id_marca" class="form-control" placeholder="Marca do Equipamento">
                                    <span ref="mensagemMarca" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <div class="md-3">
                                    <label class="form-label required">Modelo</label>
                                    <input v-model="inputModelo" type="text" name="modelo" maxlength="55" required=""
                                        id="id_modelo" class="form-control" placeholder="Modelo do Equipamento">
                                    <span ref="mensagemModelo" class="text-danger"></span>
                                </div>
                            </div>
                            <div class="md-3">
                                <label class="form-label required">Tipo Devolução</label>
                                <select v-model="inputTipoDevolucao" name="tipo_baixa" id="id_tipo_baixa"
                                    class="form-select">
                                    <option value="" selected disabled hidden>Selecione o motivo de devolução</option>

                                    <option value="sucateamento">Baixa por Sucateamento</option>

                                    <option value="baixo desempenho">Baixa por Desempenho</option>

                                </select>
                                <span ref="mensagemTipoDevolucao" class="text-danger"></span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Observações</label>
                                <textarea v-model="inputObservacoes" name="observacoes" cols="40" rows="10" required=""
                                    id="id_observacoes" class="form-control" style="height: 100px;"
                                    placeholder="Observações e testes realizados"></textarea>
                                <span ref="mensagemObservacoes" class="text-danger"></span>
                            </div>
                        </div>
                        <div class="botoes">
                            <div class="py-3">
                                <RouterLink to="/" class="btn btn-primary w-150">
                                    Voltar
                                </RouterLink>
                            </div>
                            <div class="py-3">
                                <button @click.prevent="enviarDados" type="submit" class="btn btn-success w-100">
                                    Adicionar Laudo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
.title-form {
    display: flex;
    justify-content: center;
}


.botoes {
    display: flex;
    justify-content: space-between;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.readonly_select {
    background-color: #1b293a;
    color: grey;
    pointer-events: none;
}
</style>