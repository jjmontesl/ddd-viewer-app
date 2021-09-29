<template>
    <div class="ddd-search unselectable">
      <v-card>
        <v-card-text class="pa-0">
          <v-layout>
            <v-text-field class="my-0" hide-details="true" label="Search" solo placeholder="Address or place" v-model="query"></v-text-field>
            <v-btn class="cream" x-large @click="this.goPageSearch">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
</template>

<style>
.ddd-search {
    position: fixed;
    z-index: 2;
    top: 112px;
    right: 10px;
    /* opacity: .75; */
    cursor: pointer;
}
*.unselectable {
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>

<script>

export default {

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },

  data() {
    return {
      query: null,
    }
  },

  methods: {
    goPageSearch() {
      // TODO: query encoded
      const queryEncoded = encodeURIComponent(this.query);

      this.$router.push(`/maps/search/${queryEncoded}`);
    }
  }
}

</script>