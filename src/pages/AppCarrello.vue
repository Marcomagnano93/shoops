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
        <div class="container d-flex justify-content-center">
          <ul class="shop_list">
            <li class="d-flex justify-content-between big_icon">
              <p>Nome</p>
              <p>Quantità</p>
            </li>

            <li class="d-flex gap-3"
            v-for="item in this.store.items"
            >

              <div class="icon c_orange bg_gray"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              <!-- <div class="icon c_red bg_pinky"  @click="removeItem(item)" >
                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </div> -->
              
              <div class="item_text">
                <p class="check item_font c_gray" v-if="item.checked === true">{{ item.itemName }}</p>
                <p v-if="item.checked === false" class="item_font c_red">{{ item.itemName }}</p>
                <p class="item_font">{{ item.itemQty }}</p>
              </div>
              
            </li>
          </ul>
        </div>
    </section>
  </main>
</template>

<style>
.shop_list{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 800px;
}
</style>