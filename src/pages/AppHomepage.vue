

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
      <div class="container my-3 d-flex justify-content-center align-center">
        <div class="d-flex flex-column">
            <div class="form_content bg_orange">
              <!-- Item Name -->
              <div>
                <input type="text" class="form-control" v-model="newItem.itemName" @click="errorNameSwitcher()" placeholder="Nome del prodotto">
                <div class="alarm" v-if="this.nameError === true">Inserisci un nome</div>
                
              </div>
    
              <!-- QTY -->
              <div>
                <input type="number" class="form-control" v-model="newItem.itemQty" @click="errorQtySwitcher()" placeholder="Quantità">
                <div class="alarm" v-if="this.qtyError === true">Inserisci una quantità</div>
                <div class="alarm" v-if="this.qtyNegError === true">La quantità deve essere maggiore di 0</div>
                <div class="alarm" v-if="this.qtyNaNError === true">La quantità deve essere un numero!</div>
              </div>
              <div class="button_gray" @click="addItem(this.newItem)">Aggiungi</div>
            </div>
            <div class="my-4">
                <ul>
                    <li class="d-flex gap-3 my-2"
                    v-for="item in this.store.items">

                <div class="icon c_red bg_pinky"  @click="removeItem(item)" >
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                </div>
                
                <div class="item_text">
                    <p class="item_font c_red">{{ item.itemName }}</p>
                    <p class="item_font">{{ item.itemQty }}</p>
                </div>
                    </li>
                </ul>
            </div>
        </div>



        

      
      </div>
    </section>
  </main>

</template>

<style>
.form_content {
  width: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  border-radius: 24px;
  padding: 32px;
}

.alarm{
    color: var(--red);
    border-radius: 8px;
    padding: 2px;
    background-color: var(--lightpinky);
    margin-top: 4px;
}
</style>