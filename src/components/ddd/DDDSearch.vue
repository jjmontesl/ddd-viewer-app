<template>
    <div class="ddd-search unselectable">
      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="5" offset-sm="7" md="4" offset-md="8" >
          <v-card>
            <v-card-text class="pa-0">
                <v-form action="" @submit.prevent="goPageSearch">
                  <v-layout>
                    <v-text-field class="my-0" hide-details="true" label="Search" solo placeholder="Address or place" v-model="query"></v-text-field>
                    <v-btn class="cream" x-large @click="this.goPageSearch">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-layout>
                </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<style>
.ddd-search {
    z-index: 2;
    margin: 10px;
    /* opacity: .75; */
    cursor: pointer;
    pointer-events: auto;
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
      const queryEncoded = encodeURIComponent(this.query);

      this.$router.push(`/maps/search/${queryEncoded}`);
    }
  }
}

</script>