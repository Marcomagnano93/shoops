<script>
import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
      filIt: '',
      filteredItems: []
    }
  },
  methods: {
    keep(){
      localStorage.items = JSON.stringify(this.store.items);
      
    },
    keepUp() {
      this.store.items = localStorage.items ? JSON.parse(localStorage.items) : [];
    },
    checkItem(item){
      if(item.checked === false){
        return item.checked = true;
      }
      else {
        return item.checked = false;
      }
    },
    filterItems(){ 

      this.filteredItems.splice(0, this.filteredItems.length)

      for (
        let i = 0; i<this.store.items.length; i++
      ){

        let singleItem = this.store.items[i];

        if(singleItem.badge === this.filIt){
          this.filteredItems.push(singleItem);
        }

      }

    }
  },
  mounted() {
    this.keepUp();

  }
}

</script>

<template>
  <main class="bg_lightpinky">
    <section class="h-100">
        <div class="container-fluid d-flex justify-content-center py-3">
          <ul class="shop_list">
            <!-- MENU -->
            <li v-if="this.store.items.length === 0" class="my2">
                <h3>A quanto pare non c'è nulla nella tua lista</h3>
                <p>Creala qui: <RouterLink to="/">Home</RouterLink></p>
            </li>
            <li v-if="this.store.items.length > 0" class="table_head">
              <div class="col">
                <p>Nome</p>
              </div>

              <div class="d-flex align-items-center mx-2">
                <select class="form-select" aria-label="Default select example" v-model="filIt">
                    <option selected @click="filterItems()">Categoria</option>
                    <option v-for="badge in store.badges"
                    :value="badge" @click="filterItems()">{{badge}}</option>
                    <option value="" @click="filterItems()">Senza categoria</option>
                 </select>
              </div>

              <div class="col">
                <p>Quantità</p>
              </div>
            </li>

            <!-- NO FILTER -->
            <li class="d-flex gap-3" v-if="filteredItems.length === 0"
            v-for="item in this.store.items"
            >

              <div v-if="item.checked === true" class="icon c_orange bg_gray"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              <div v-if="item.checked === false" class="icon c_orange bg_red"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              
              <div class="item_text">
                <div class="name_badge">
                  <p class="check item_font c_gray" v-if="item.checked === true">{{ item.itemName }}</p>
                  <p v-if="item.checked === false" class="item_font c_red">{{ item.itemName }}</p>
                  <div :class="item.badge" class="badge mx-3">{{ item.badge }}</div>
                </div>

                <p v-if="Number.isInteger(item.itemQty) " class="item_font spacing_right">{{ item.itemQty }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
                <p v-else class="item_font">{{ item.itemQty.toFixed(2) }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
              </div>
              
            </li>

            <!-- FILTERED -->
            <li class="d-flex gap-3" v-if="filteredItems.length !== 0"
            v-for="item in filteredItems"
            >

              <div v-if="item.checked === true" class="icon c_orange bg_gray"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              <div v-if="item.checked === false" class="icon c_orange bg_red"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              
              <div class="item_text">
                <div class="name_badge">
                  <p class="check item_font c_gray" v-if="item.checked === true">{{ item.itemName }}</p>
                  <p v-if="item.checked === false" class="item_font c_red">{{ item.itemName }}</p>
                  <div :class="item.badge" class="badge mx-3">{{ item.badge }}</div>
                </div>

                <p v-if="Number.isInteger(item.itemQty) " class="item_font spacing_right">{{ item.itemQty }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
                <p v-else class="item_font">{{ item.itemQty.toFixed(2) }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
              </div>
              
            </li>
          </ul>
        </div>
    </section>
  </main>
</template>

<style>
.table_head{

    background-color: var(--orange);
    color: var(--lightpinky);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 4px 4px;
    border-radius: 12px;
}
.shop_list{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>