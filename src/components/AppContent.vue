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
      newItem: {
        itemName: '',
        itemQty: 1,
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
    },
    addItem(newItem){
      if(this.newItem.itemName === ''){
          this.nameError = true;            
      }
      else if(this.newItem.itemQty === ''){
          this.qtyError = true;
      }
      else{
        this.nameError = false;
        this.qtyError = false;
        this.store.items.push({...newItem})
        this.keep();
        this.newItem.itemName = '';
        this.newItem.itemQty = 1;

      }
    },
    removeItem(item){
      this.store.items.splice(item, 1);
      this.keep();
    },

  },
  mounted() {
    this.keepUp();

  }
}

</script>

<template>

  <main>
    <section class="h-100">
      <div class="container py-5 h-100">
        <div class="row">
          <div class="form_content">
            <input type="text" v-model="newItem.itemName" @click="errorNameSwitcher()">
            <div v-if="this.nameError === true">Inserisci un nome</div>
            <input type="text" v-model="newItem.itemQty" @click="errorQtySwitcher()">
            <div v-if="this.qtyError === true">Inserisci la quantità</div>
            <div class="btn btn-primary" @click="addItem(this.newItem)">Aggiungi</div>
          </div>

        </div>
        <div class="row">
          <div class="col"
          v-for="item in this.store.items"
          >
            <p>{{ item.itemName }}</p>

            <p>{{ item.itemQty }}</p>
            <div class="btn btn-danger" @click="removeItem(item)">rimuovi</div>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<style></style>