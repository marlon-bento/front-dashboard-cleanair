<template>

    <div class="container container-narrow d-flex justify-content-center align-items-center full-height">
        <div class="card card-md">
            <div class="card-body">
                <h2 class="text-center h2 mb-5">Escolha sua Unidade de Origem</h2>
                <form method="post">
                    <div style="display: flex;">
                        <select v-model="modelUnidade" class="form-select" style="margin-right: 10px;" id="unidade"
                            name="unidade">
                            <option value="" selected disabled hidden>Selecione sua Unidade</option>
                            <option  v-for="(item, index) in unidades" :key="index" :value="item.id">
                                {{ item.nome }}
                            </option>
                        </select>
                        <button @click.prevent="alteraUnidade()" type="submit"
                            class="btn btn-primary ">Selecionar</button>
                    </div>
                </form>
                <hr>
                <div>
                    <h3>- Esta escolha será feita apenas uma vez. Ao selecionar a unidade, os laudos vistos e
                        criados serão exclusivamente dessa mesma unidade.
                    </h3>
                    <div class=" ">
                        <a class="back-login" @click.prevent="deslogar()" href="">Voltar para tela de login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useLoginStore } from "@/stores/LoginStore";
import { onMounted, ref } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router';
import * as apis from '@/assets/static/js/apis.js'; // Importando todas urls bases das apis usadas
const login = useLoginStore()
const unidades = ref([])
const modelUnidade = ref("")
const router = useRouter(); 


async function alteraUnidade() {
    if (modelUnidade.value !== "") {
        try {
            const response = await axios.patch(`${apis.baseLaudo}/altera-unidade/${modelUnidade.value}/`,
                {},  // Corpo vazio se não há dados a serem enviados
                {
                    headers: {
                        Authorization: `Bearer ${login.token}`,
                    }
                }
            )
            
            // pega o nome da unidade para poder atualizala no store
            const unidadeEscolhida = unidades.find(item => item.id === modelUnidade.value);
            login.atualizaFirstAccess(unidadeEscolhida)
            router.push({ name: 'home' })
            
        } catch (error) {
            console.log(error)
        }
    } else {
        alert("Selecione uma unidade")
    }

}
function deslogar(){
    login.logoutAction()
    router.push({ name: 'login' })
}
async function getUnidades() {
    try {
        const response = await axios.get(apis.baseLaudo+"/api-unidades/", {
            headers: {
                Authorization: `Bearer ${login.token}`,
            }
        })
        unidades.value = response.data
        

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getUnidades()
})
</script>
<style scoped>
.back-login{
    text-decoration: underline;
}
.full-height{
    height: 100vh;
}
</style>