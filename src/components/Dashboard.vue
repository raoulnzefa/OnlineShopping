<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            
           
            <h3>Ingresar requerimiento</h3>
            <div v-if="user" class="alert alert-success" role="alert">Sesión Iniciada Exitosamente {{user.data.email}}!</div>
            <img src="" alt="Image" height="90" width="90" class="rounded mx-auto d-block" />
             CATEGORIA:
            <b-form-select v-model="selectedCategory" :options="options" size="sm" class="mt-3"></b-form-select>
            <div class="mt-3">Categoría Seleccionada: <strong>{{ selectedCategory }}</strong></div>
             SOPORTE:
         <!--    <div v-if="selectedCategory!=null">-->
             <b-form-select v-model="selectedSoporte" size="sm" class="mt-3">
               <option v-for="soporte in ComputedServicios" :value="soporte.nombre" :key="soporte.id" >{{ soporte.nombre }}</option>

             </b-form-select>
             <!--</div>-->
            <div class="mt-3">Soporte Seleccionado: <strong>{{ selectedSoporte}}</strong></div>
            <div class="form-group">
            <label >Comentarios Adicionales:</label>
            <textarea v-model="comentariosText" class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3"></textarea>
            <label >Nombre Persona que Solicita:</label>
            <input type="text" v-model="solicitanteText" class="form-control" aria-label="Persona que solicita:" aria-describedby="inputGroup-sizing-default">
            <label >Numero telefonico de contacto:</label>
            <input type="text" v-model="telefonoText" class="form-control" aria-label="numero:" aria-describedby="inputGroup-sizing-default">
            <div class="text-center">
            <button type="button" class="btn btn-success" v-on:click="upload(selectedSoporte,selectedCategory)">Enviar Soporte</button>
            </div>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import { db } from '../firebase';
import firebase from "firebase";
import {servsRef} from '../firebase'
import {fincasRef} from '../firebase'
Vue.use(db)
Vue.use(firebase)
//Vue.use(servsRef)

//console.log(db);

export default {
   
   firebase: {
    servicios: servsRef,
    fincas : fincasRef
  },
  
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    }),
   ComputedServicios()  {
    return this.servicios.filter(soporte => soporte.categoria == this.selectedCategory)
}
  },
  created() {
    
    },
 

   data() {
      return {
        
       fincas: [],
       servicios: [],
       vm : this,
        
        selectedSoporte:null,
        selectedCategory: null,
        comentariosText:"",
        telefonoText:"",
        solicitanteText:"",
        options: [
          { value: null, text: 'Elija la categoría del soporte' },
          { value: 'electrico', text: 'Eléctrico' },
          { value: 'hidraulico', text: 'Hidráulico' },
          { value: 'electronico', text: 'Electrónico' },
          { value: 'mecanico', text: 'Mecánico'},
          { value: 'neumatico', text: 'Neumático'}
        ]
      }
    },

    methods: {
    upload (selectedSoporte,selectedCategory) {
      var myRef = firebase.database().ref('Soportes');
      var key = myRef.push().key;
      const email = this.$store.state.user.data.email
    console.log("hola luchito")
      console.log(this.$store.state.user.data.email);
      //console.log(event);
    const upSoporte = {
      categoria:selectedCategory,
      comentarios:this.comentariosText,
      comentariost:"", //app
      detalle:selectedSoporte,
      fecha:new Date().toLocaleString(),
      finalizado:"no",
      finca:this.findFinca(email),//falta agarrar la finca
      hbase:this.findHbase(selectedSoporte),
      id:"",//falta ver como llamar al id igual que al nodo
      personaRecibe:"",
      tecnico:"",
      valor:0,
      solicitante:this.solicitanteText,
      telefono:this.telefonoText
    }
    console.log(upSoporte);
    //this.upload;
      myRef.push(upSoporte)
     .then(
       (snapshot) => {
     myRef.child(snapshot.key).update({"id": snapshot.key})
   },
   alert('Soporte Solicitado Exitosamente !')
       )
     .catch((error => {console.log(error)}))
      this.selectedSoporte=undefined
      this.selectedCategory=undefined
      this.comentariosText=undefined
      this.solicitanteText=undefined
      this.telefonoText=undefined
    },

    findHbase(selectedSoporte){
      let hbase = 0;
      for (let i = 0; i < this.servicios.length;i++)
      { if (this.servicios[i].nombre == selectedSoporte)
          {hbase = this.servicios[i].hbase}

      }

       return hbase
    },
    findFinca(email){
      let finca = "";
      for (let i = 0; i < this.fincas.length;i++)
      { if (this.fincas[i].correo == email)
          {finca = this.fincas[i].nombre}

      }

       return finca
    }
  }
    
};
</script>