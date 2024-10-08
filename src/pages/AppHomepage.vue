

<script>
import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
      nameError: false,
      qtyError: false,
      qtyNegError: false,
      qtyNaNError: false,
      newItem: {
        itemName: '',
        itemQty: 1,
        checked: false,
      }
    }
  },
  methods: {
    keep(){
      localStorage.items = JSON.stringify(this.store.items);
      
    },
    keepUp() {
      this.store.items = localStorage.items ? JSON.parse(localStorage.items) : [];
    },
    errorNameSwitcher(){
      this.nameError = false;
    },
    errorQtySwitcher(){
      this.qtyError = false;
      this.qtyNegError = false;
      this.qtyNaNError = false;
    },
    checkItem(item){
      if(item.checked === false){
        return item.checked = true;
      }
      else {
        return item.checked = false;
      }
    },
    addItem(newItem){
      // VALIDATIONS
      if(this.newItem.itemName === ''){
          this.nameError = true;            
      }
      else if(this.newItem.itemQty === ''){
          this.qtyError = true;
      }
      else if(this.newItem.itemQty <= 0){
        this.qtyNegError = true;
      }
      else if(isNaN(this.newItem.itemQty)){
        this.qtyNaNError = true;
      }
      // ADD ITEM
      else{
        this.nameError = false;
        this.qtyError = false;
        this.qtyNegError = false;
        this.qtyNaNError = false;
        this.store.items.push({...newItem})
        this.keep();
        this.newItem.itemName = '';
        this.newItem.itemQty = 1;
        this.newItem.checked = false;
      }
    },
    removeItem(item){
      this.store.items.splice(this.store.items.indexOf(item), 1);
      this.keep();
    },
  },
  mounted() {
    this.keepUp();

  }
}

</script>

<template>
 <main class="bg_lightpinky">
    <section class="h-100">
      <div class="container py-5 h-100">
        

          <div class="form_content bg_orange">
            <!-- Item Name -->
            <div>
              <input type="text" v-model="newItem.itemName" @click="errorNameSwitcher()" placeholder="Nome del prodotto">
              <div v-if="this.nameError === true">Inserisci un nome</div>
            </div>

            <!-- QTY -->
            <div>
              <input type="number" v-model="newItem.itemQty" @click="errorQtySwitcher()" placeholder="Quantità">
              <div v-if="this.qtyError === true">Inserisci una quantità</div>
              <div v-if="this.qtyNegError === true">La quantità deve essere maggiore di 0</div>
              <div v-if="this.qtyNaNError === true">La quantità deve essere un numero!</div>
            </div>
            <div class="btn btn-primary" @click="addItem(this.newItem)">Aggiungi</div>
          </div>

        

      
      </div>
    </section>
  </main>

</template>

<style></style>