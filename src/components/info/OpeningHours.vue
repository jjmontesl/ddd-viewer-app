<template>
    <p v-if="result.extratags.opening_hours">
        <v-row>
                <v-col class="col-1">
                    <v-icon class="info--text">mdi-clock</v-icon>
                </v-col>
                <v-col class="col-11">
                    <span class="info--text">{{result.extratags.opening_hours}}</span>
                </v-col>
        </v-row>
    </p>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>