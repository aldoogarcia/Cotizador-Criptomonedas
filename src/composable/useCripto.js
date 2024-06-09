import {ref,onMounted,computed} from 'vue'


export default function useCripto (){

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    const criptos=ref([])
    const cotizacion=ref({})
    const spiner=ref(false)

    
    
    const obtenerCotizacion = async (monedasR) => {
        spiner.value=true
        cotizacion.value={}
        const {moneda,criptomoneda}=monedasR
        const urlCotiza = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const repuesta = await fetch(urlCotiza)
        const data = await repuesta.json()
        cotizacion.value= data.DISPLAY[criptomoneda][moneda]
        spiner.value=false
        // console.log(cotizacion.value.TOPTIERVOLUME24HOUR);
      }

    onMounted(()=>{
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
        fetch(url)
         .then(respuesta=>respuesta.json())
         .then(({Data}) => criptos.value=Data)
        //  console,console.log(criptos.value);
      })

      const muestraResult= computed(()=>{
        return Object.values(cotizacion.value).length>0
      })
    return {
        monedas,
        obtenerCotizacion,
        criptos,
        cotizacion,
        spiner,
        muestraResult
    }
}