<script setup>
  import {onMounted, ref,reactive} from 'vue'
  import AlertaItem from './components/alerta-item.vue'
    const monedas = ref([
      { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
      { codigo: 'MXN', texto: 'Peso Mexicano'},
      { codigo: 'EUR', texto: 'Euro'},
      { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])

  const criptos=ref([])
  const monedasR=reactive({
    moneda:'',
    criptomoneda:''
  })
  const error=ref('')
  const cotizacion=ref({})

  onMounted(()=>{
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    fetch(url)
     .then(respuesta=>respuesta.json())
     .then(({Data}) => criptos.value=Data)
    //  console,console.log(criptos.value);
  })

  const cotizarMoneda = () => {
    if(Object.values(monedasR).includes('')){
      error.value='Todos los campos son obligatorios'
      setTimeout(()=>{
        error.value=''
      },3000)
      
      return
    }
    error.value=''
    obtenerCotizacion()
  }
  const obtenerCotizacion = async () => {
    const {moneda,criptomoneda}=monedasR
    const urlCotiza = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
    const repuesta = await fetch(urlCotiza)
    const data = await repuesta.json()
    cotizacion.value= data.DISPLAY[criptomoneda][moneda]
    // console.log(cotizacion.value.TOPTIERVOLUME24HOUR);
    
    
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <AlertaItem v-if="error">
        {{ error }}
      </AlertaItem>

      <form @submit.prevent="cotizarMoneda" class="formulario">
        <div class="campo">
          <label for="moneda">Moneda</label>
          <select
            v-model="monedasR.moneda"
            id="moneda">
            <option value="">-- Selecciona --</option>
            <option 
            v-for="moneda in monedas"
            :key="moneda.codigo"
            :value="moneda.codigo">
            {{ moneda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">Criptomoneda</label>
          <select 
            v-model="monedasR.criptomoneda"
            id="criptomoneda">
            <option value="">-- Selecciona --</option>
            <option 
            v-for="criptomoneda in criptos"
            :key="criptomoneda.CoinInfo.Id"
            :value="criptomoneda.CoinInfo.Name">
            {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar"/>
      </form>
    </div>
  </div>
</template>


