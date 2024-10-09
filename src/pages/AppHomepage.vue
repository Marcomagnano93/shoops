

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
        kilos: false,
        badge: ''
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
      if(this.newItem.itemName === '' || this.newItem.itemName === ' '){
          this.nameError = true;            
      }
      else if(this.newItem.itemQty === '' || this.newItem.itemQty > 999){
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

        let cartItem = this.store.items.find((item) => item.itemName === this.newItem.itemName);
        if(cartItem){
            cartItem.itemQty += this.newItem.itemQty;
            this.keep();
            this.newItem.itemName = '';
            this.newItem.itemQty = 1;
            this.newItem.checked = false;
        }
        else{
            this.store.items.push({...newItem})
            this.keep();
            this.newItem.itemName = '';
            this.newItem.itemQty = 1;
            this.newItem.checked = false;
        }
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
            <div class="form_content bg_orange ">
              <!-- Item Name -->
              <div class="col">
                <input type="text" class="form-control" v-model="newItem.itemName" @click="errorNameSwitcher()" placeholder="Nome del prodotto" required>
                <div class="alarm" v-if="this.nameError === true">Inserisci un nome</div>
                
              </div>
    
              <!-- QTY -->
              <div class="col">
                <input type="number" class="form-control" v-model="newItem.itemQty" @click="errorQtySwitcher()" placeholder="Quantità 1-999" required>
                <div class="alarm" v-if="this.qtyError === true">Inserisci una quantità</div>
                <div class="alarm" v-if="this.qtyNegError === true">La quantità deve essere maggiore di 0</div>
                <div class="alarm" v-if="this.qtyNaNError === true">La quantità deve essere un numero!</div>
              </div>

              <!-- TYPE -->
                <div class="form-check form-switch col">
                    <label class="form-check-label c_lightpinky" for="flexSwitchCheckChecked">Misura in KG</label>
                    <input class="form-check-input bg_red" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="newItem.kilos">
                </div>

                <!-- BADGES -->
                <div class="col-sm-100">
                  <select class="form-select" aria-label="Default select example" v-model="newItem.badge">
                    <option selected>Scegli una categoria</option>
                    <option v-for="badge in store.badges"
                    :value="badge">{{badge}}</option>
                  </select>

                </div class="col">
              <!-- ADD TO SHOPLIST -->
              <div class="button_gray" @click="addItem(this.newItem)">Aggiungi</div>

            </div>
            <!-- <ul class="badges_form">
                <li v-for="badge in store.badges">
                  <p>{{ badge }}</p>
                </li>
              </ul> -->
            <div class="my-4">
                <ul>
                    <li v-if="this.store.items.length === 0" class="my2"><h3>Aggiungi un prodotto per creare la tua lista!</h3></li>
                    <li class="d-flex gap-3 my-2"
                    v-for="item in this.store.items">

                        <div class="icon c_red bg_pinky"  @click="removeItem(item)" >
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </div>
                        
                        <div class="item_text">
                            <div class="name_badge">
                              <p class="item_font c_red">{{ item.itemName }}</p>
                              <div :class="item.badge" class="badge">{{ item.badge }}</div>
                            </div>
                            <p v-if="Number.isInteger(item.itemQty) " class="item_font">{{ item.itemQty }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
                            <p v-else class="item_font">{{ item.itemQty.toFixed(2) }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  border-radius: 24px;
  padding: 32px;

}

.alarm{
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--lightpinky);
    border-radius: 8px;
    padding: 2px;
    background-color: var(--gray);
    margin-top: 4px;
}



/* .badges_form{
  display: flex;
} */
</style>