<template>

    <apexchart ref="chart" :options="chartOptions" :series="chartSeries" type="line" height="400">
    </apexchart>

</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import moment from "moment";

// Definindo a referência do gráfico
const chart = ref(null);

const props = defineProps(["dioxido", "filtro", "quantidade"]);

const chartOptions = ref({
    chart: {
        type: 'line',
        height: 400,
    },
    xaxis: {
        categories: [],
        title: {
            text: 'Data',
            style: {
                color: '#fff', // Cor do título do eixo X
                fontSize: '16px',  // Tamanho da fonte
                fontWeight: 'bold', // Peso da fonte
            },
        },
        labels: {
            style: {
                colors: '#FFF', // Cor dos rótulos do eixo X
                fontSize: '12px',  // Tamanho da fonte dos rótulos
                fontFamily: 'Arial, sans-serif', // Fonte dos rótulos
            },
        },
    },
    yaxis: {
        min: 0,
        title: {
            text: 'Valor do Sensor',
            style: {
                color: '#fff', // Cor do título do eixo X
                fontSize: '16px',  // Tamanho da fonte
                fontWeight: 'bold', // Peso da fonte
            },
        },
        labels: {
            style: {
                colors: '#FFF', // Cor dos rótulos do eixo X
                fontSize: '12px',  // Tamanho da fonte dos rótulos
                fontFamily: 'Arial, sans-serif', // Fonte dos rótulos
            },
        },
    },
    stroke: {
        curve: 'smooth',
    },
    colors: ['#4bc0c0'],
    markers: {
        size: 4,
    },
    grid: {
        borderColor: '#f1f1f1',
    },

    tooltip: {
        enabled: true,
        theme: 'dark', // Tema do tooltip (pode ser 'light' ou 'dark')
        style: {
            fontSize: '12px', // Tamanho da fonte do tooltip
            fontFamily: 'Arial, sans-serif', // Fonte do tooltip
        },
        marker: {
            show: true, // Mostrar o marcador do tooltip
        },
        onDatasetHover: {
            highlightDataSeries: true,
        },
        x: {
            show: true, // Mostrar o valor do eixo X
        },
        y: {
            title: {
                formatter: (seriesName) => `Valor de ${seriesName}:`, // Personalização do título dos dados
            },
            style: {
                color: '#FF6347', // Cor dos dados no tooltip
            },
        },
    },
});

const chartSeries = ref([{
    name: "Níveis de Dióxido",
    data: [],
}]);

const filtrarPorIntervalo = (dados, filtro) => {
    const agora = moment();
    switch (filtro) {
        case "dia":
            return dados.filter((item) => moment(item.timestamp).isSame(agora, "day"));
        case "mes":
            return dados.filter((item) => moment(item.timestamp).isSame(agora, "month"));
        case "ano":
            return dados.filter((item) => moment(item.timestamp).isSame(agora, "year"));
        case "todo":
        default:
            return dados;
    }
};

const limitarDados = (dados, quantidade) => {
    return dados.slice(0, quantidade);
};

const atualizarGrafico = () => {
    let dadosFiltrados = filtrarPorIntervalo(props.dioxido, props.filtro);
    dadosFiltrados = limitarDados(dadosFiltrados, props.quantidade);

    const dadosFormatados = dadosFiltrados.map((item) => ({
        timestamp: moment(item.timestamp).format("DD/MM/YYYY HH:mm"),
        value: item.value,
    }));

    chartOptions.value.xaxis.categories = dadosFormatados.map((dado) => dado.timestamp);
    chartSeries.value[0].data = dadosFormatados.map((dado) => dado.value);

    // Forçando a atualização do gráfico
    nextTick(() => {
        if (chart.value) {
            chart.value.updateOptions(chartOptions.value);  // Atualiza as opções do gráfico
            chart.value.updateSeries(chartSeries.value);    // Atualiza os dados da série
        }
    });
};

watch(
    [() => props.dioxido, () => props.filtro, () => props.quantidade],
    () => {
        atualizarGrafico();
    },
    { immediate: true }
);

onMounted(() => {
    atualizarGrafico();
});
</script>