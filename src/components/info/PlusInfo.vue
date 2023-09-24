<template>
    <div>
        <p v-if="result.address.suburb" class="text--darken-1">(Suburb/District: <i>{{this.result.address.suburb}}</i>)</p>
        
        <!--
        <p v-if="result.class">Class: {{result.class}}</p>
        <p v-if="result.type">Type: {{result.type}}</p>
        -->
        <p v-if="result.extratags && result.extratags.start_dates">Start Date: {{result.extratags.start_date}}</p>

        <a v-if="result.extratags && result.extratags.website" :href="result.extratags.website" target="_blank" rel="noopener noreferrer">{{result.extratags.website}}</a>
    </div>
</template>

<script>

export default {
    props: ["result"]
}
</script>

<style>

</style>
