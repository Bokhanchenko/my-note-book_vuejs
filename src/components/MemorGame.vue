<template>
  <div class="wrapper">
    <button @click="clearGame" class="btn">restart</button>
    <div v-if="gameOver"
         class="game-over-baner"
         @click="clearGame">
      <h4>Boom!!))</h4>
    </div>
    <div class="row"
         v-for="(block, index) in blocks"
         :key="index">
      <MemoryItem v-for="item in block"
                  :key="item.id"
                  :item="item"
                  @itemClick="setStatus">
      </MemoryItem>
    </div>
  </div>
</template>

<script>
  import MemoryItem from './MemoryGameItem'

  export default {
    data() {
      return {
        firstItem: null,
        secondItem: null,
        STATUS_DEFAULT: 0,
        STATUS_SELECT: 1,
        STATUS_DONE: 2,
        blocks: [
          [
            { id: 1, value: 1, status: 0 },
            { id: 2, value: 2, status: 0 },
            { id: 3, value: 3, status: 0 },
            { id: 4, value: 4, status: 0 },
          ],
          [
            { id: 5, value: 2, status: 0 },
            { id: 6, value: 5, status: 0 },
            { id: 7, value: 6, status: 0 },
            { id: 8, value: 1, status: 0 },
          ],
          [
            { id: 9, value: 5, status: 0 },
            { id: 10, value: 3, status: 0 },
            { id: 11, value: 7, status: 0 },
            { id: 12, value: 8, status: 0 },
          ],
          [
            { id: 13, value: 8, status: 0 },
            { id: 14, value: 6, status: 0 },
            { id: 15, value: 7, status: 0 },
            { id: 16, value: 4, status: 0 },
          ],
        ],
      }
    },
    computed: {
      flatList() {
        return this.blocks
          .reduce((acc, block) => {
          acc.push(...block);
          return acc;
        }, []);
      },
      gameOver() {
        return this.flatList.every(this.isConfirmed)
      }
    },
    methods: {
      isConfirmed(item) {
        return item.status === this.STATUS_DONE
      },
      getItemById(itemId) {
        return this.flatList.find(({ id }) => id === itemId);
      },
      setStatus(itemId) {
        if (!this.firstItem) {
          this.firstItem = this.getItemById(itemId);
          this.firstItem.status = this.STATUS_SELECT
        } else if (!this.secondItem) {
          this.secondItem = this.getItemById(itemId);
          this.secondItem.status = this.STATUS_SELECT

          setTimeout(() => this.confirmOrReject(this.firstItem, this.secondItem), 500)
        }
      },
      confirmOrReject(firstItem, secondItem) {
        const isTheSame = firstItem.value === secondItem.value

        if (isTheSame) {
          this.confirmSelected(firstItem, secondItem)
        } else {
          this.rejectSelected(firstItem, secondItem)
        }

        this.clearSelected()
      },
      confirmSelected(firstItem, secondItem) {
        firstItem.status = this.STATUS_DONE;
        secondItem.status = this.STATUS_DONE;
      },
      rejectSelected(firstItem, secondItem) {
        firstItem.status = this.STATUS_DEFAULT;
        secondItem.status = this.STATUS_DEFAULT;
      },
      clearSelected() {
        this.firstItem = null;
        this.secondItem = null;
      },
      clearGame() {
        this.clearSelected()
        this.blocks.forEach(block => block.forEach(item => item.status = this.STATUS_DEFAULT));
      }
    },
    components: {
      MemoryItem,
    }
  }
</script>

<style scoped>
  .wrapper {
    display: inline-flex;
    flex-direction: column;
    position: relative;
  }
  .row {
    display: flex;
  }
  .game-over-baner {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    background-color: aqua;
  }
  h4 {
    margin: auto;
  }
  .btn {
    background-color: blue;
    color: white;
    padding: 4px;
    margin: 0 0 5px 0;
  }
</style>
