<template>
    <div class="form-patient">
        <v-form :format="format" :isFile="true"></v-form>
    </div>
</template>
<script>
import VForm from '@/components/VForm.vue';
export default {
    name: 'PatientForm',
    components: {
        'v-form': VForm
    },
    data() {
        return {
            format: {
                name: null,
                name_mom: null,
                date: null,
                cpf: null,
                cns: null,
                cep: null,
                logradouro: null,
                complemento: null,
                bairro: null,
                localidade: null,
                uf: null
            }
        }
    },
    destroyed() {
        console.log(this)
        this.$emit('destroyed')
    },
}
</script>
<style lang="scss" scoped>
.form-patient{
    display: flex;
    flex-flow: column nowrap;
}
</style>