<template>
    <apexchart ref="chart" :options="chartOptions" :series="chartSeries" type="line" height="400">
    </apexchart>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import moment from "moment";

// Definindo a referência do gráfico
const chart = ref(null);

const props = defineProps(["temperatura", "umidade", "filtro", "quantidade"]);

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
            text: 'Temperatura X Umidade',
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
    colors: ['#FF6347', '#4bc0c0'], // Alterei as cores para diferenciar as linhas de temperatura e umidade
    markers: {
        size: 4,
    },
    grid: {
        borderColor: '#f1f1f1',
    },
    legend: {
        show: true,
        position: 'top', // Pode ser 'top', 'right', 'bottom', 'left'
        horizontalAlign: 'center', // Alinha a legenda no centro, pode ser 'left', 'right'
        labels: {
            colors: '#fff', // Cor do texto da legenda (pode ser qualquer cor em hexadecimal, rgb, etc.)
            useSeriesColors: false, // Não usa as cores das séries na legenda
        },
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

const chartSeries = ref([
    {
        name: "Temperatura (°C)",
        data: [],
    },
    {
        name: "Umidade (%)",
        data: [],
    },
]);

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


    let dadosFiltradosTemperatura = filtrarPorIntervalo(props.temperatura, props.filtro);
    dadosFiltradosTemperatura = limitarDados(dadosFiltradosTemperatura, props.quantidade);

    const dadosFormatadosTemperatura = dadosFiltradosTemperatura.map((item) => ({
        timestamp: moment(item.timestamp).format("DD/MM/YYYY HH:mm"),
        value: item.value,
    }));
    let dadosFiltradosUmidade = filtrarPorIntervalo(props.umidade, props.filtro);
    dadosFiltradosUmidade = limitarDados(dadosFiltradosUmidade, props.quantidade);

    const dadosFormatadosUmidade = dadosFiltradosUmidade.map((item) => ({
        timestamp: moment(item.timestamp).format("DD/MM/YYYY HH:mm"),
        value: item.value,
    }));





    chartOptions.value.xaxis.categories = dadosFormatadosTemperatura.map((dado) => dado.timestamp);
    chartSeries.value[0].data = dadosFormatadosTemperatura.map((dado) => dado.value);
    chartSeries.value[1].data = dadosFormatadosUmidade.map((dado) => dado.value);

    // Forçando a atualização do gráfico
    nextTick(() => {
        if (chart.value) {
            chart.value.updateOptions(chartOptions.value);  // Atualiza as opções do gráfico
            chart.value.updateSeries(chartSeries.value);    // Atualiza os dados da série
        }
    });
};

watch(
    [() => props.temperatura, () => props.umidade, () => props.filtro, () => props.quantidade],
    () => {
        atualizarGrafico();
    },
    { immediate: true }
);

onMounted(() => {
    atualizarGrafico();
});
</script>