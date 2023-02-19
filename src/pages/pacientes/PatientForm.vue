<template>
    <div class="form-patient">
        <v-form 
            :format="format" 
            :isFile="true" 
            :paciente="patient"
            :pacientId="$route?.params?.id"
            @rerender="$emit('rerender')"
        ></v-form>
    </div>
</template>
<script>
import VForm from '@/components/VForm.vue';
import { mapGetters } from 'vuex';
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
    mounted() {
        if (['cadastro-pacientes','edita-pacientes'].includes(this.$route?.name)) this.$emit('isForm')
    },
    computed: {
        ...mapGetters({
            patients: 'pacientes/patients'
        }),
        patient: function() {
            return this.patients.filter(patient => patient.id == this.$route?.params.id)[0]     
        }
    },
    destroyed() {
        this.$emit('destroy')
    },
}
</script>
<style lang="scss" scoped>
.form-patient{
    display: flex;
    flex-flow: column nowrap;
}
</style>