<template>
    <p>
        <span class="grey--text text--lighten-1" v-if="result.address.road">{{result.address.road}}, </span>
        <span>
            <span v-if="result.address.city"><b>{{result.address.city}}, </b></span>
            <span v-else-if="result.address.town" class="black--text">{{result.address.town}}, </span>
        </span>
        <span v-if="result.address.state">
            {{result.address.state}},
        </span>
        <span v-if="result.address.country">
            {{result.address.country}}
        </span>
        <span class="details--text" v-if="result.address.postcode && result.address.postcode != 0">
            {{result.address.postcode}}
        </span>
    </p>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
