<script setup>
  import { ref,reactive} from 'vue'
  import AlertaItem from './components/alerta-item.vue'
  import SppinerItem from './components/sppiner-item.vue'
  import useCripto from './composable/useCripto'

  const {monedas,criptos,spiner,cotizacion,obtenerCotizacion,muestraResult} = useCripto()
  const monedasR=reactive({
    moneda:'',
    criptomoneda:''
  })
  const error=ref('')
  const cotizarMoneda = () => {
    if(Object.values(monedasR).includes('')){
      error.value='Todos los campos son obligatorios'
      setTimeout(()=>{
        error.value=''
      },3000)
      
      return
    }
    error.value=''
    obtenerCotizacion(monedasR)
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
      <SppinerItem
        v-if="spiner"
      />
      
      <div v-if="muestraResult" class="contenedor-resultado">
        
        <h2>Cotizacion</h2>

        <div class="resultado">
          <img :src="`https://cryptocompare.com/${cotizacion.IMAGEURL}`" alt="">
          <div >
            <p><span>Criptomoneda: </span>{{ monedasR.criptomoneda }}</p>
            <p><span>El precio es de : </span>{{ cotizacion.PRICE }}</p>
            <p><span>El precio mas alto del dia : </span>{{ cotizacion.HIGHDAY }}</p>
            <p><span>El precio mas bajo del dia : </span>{{ cotizacion.LOWDAY }}</p>
            <p><span>Variacion ultimas 24 horas : </span>{{ cotizacion.CHANGEPCT24HOUR }}%</p>
            <p><span>Ultima actualizacion : </span>{{ cotizacion.LASTUPDATE }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


