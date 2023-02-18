<template>
    <div class="list-pacientes" :class="[isOpenForm ? '-form' : '-no_form']">
        <div v-if="!isOpenForm" class="paciente-skils">
            <div class="input-field">
                <a class="btn-floating btn-large waves-effect waves" style="float: right;" @click="openForm()">
                    <i class="material-icons">add</i>
                </a>
                <input class="search validate" placeholder="Digite sua busca" id="search" type="text" v-model="search" @input="fetchPatient">
            </div>
            <div class="title">
                <span>Nome</span>
                <span>CNS</span>
                <span>Actions</span>
            </div>
            <v-divider style="margin-top: 9px" />
            <paciente 
                v-for="(patient, index) in patients" 
                :key="index" 
                :patient="patient" 
            />
            <div v-show="!patients.length" class="no_pacientes">Não há pacientes cadastrados.</div>
        </div>
        <router-view @destroyed="isOpenForm = false"></router-view>
    </div>
</template>

<script>
import VDivider from '@/components/VDivider.vue';
import { mapActions, mapGetters } from 'vuex';
import Paciente from './Paciente.vue';

export default {
    name: 'List',
    components: {
        Paciente,
        'v-divider': VDivider
    },
    data() {
        return {
            search: '',
            isOpenForm: false
        }
    },
    mounted() {
        this.listPatients()
        if (this.$route?.name === 'cadastro-pacientes') this.isOpenForm = true
    },
    computed: {
        ...mapGetters({
            patients: 'pacientes/patients'
        })
    },
    methods: {
        ...mapActions({
            listPatients: 'pacientes/listPatients'
        }),
        fetchPatient: function(event) {
            const searched = event.target.value
        },
        openForm() {
            this.isOpenForm = true
            this.$router.push({ name: 'cadastro-pacientes'})
        }
    }
}
</script>

<style lang="scss" scoped>
.list-pacientes{
    width: 767px;
    background: rgba(255, 255, 255, 0.67);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    @media (max-width: 600px) { margin: 0 20px; }

    &.-form{
        @media (max-width: 600px) { 
            margin: 0;
            padding: 20px;
        }
    }
    >.paciente-skils{
        padding: 16px;

        >.title{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            font-weight: 500;
            font-size: 1.3em;
            line-height: 23px;

            @media (max-width: 600px) { font-size: 1.2em; }
        }

        >.no_pacientes{
            text-align: center;
            font-weight: 500;
            line-height: 22px;
            font-size: 1em;
            margin-top: 10px;

            @media (max-width: 600px) { font-size: 0.9em; }
        }
    }


  .input-field{
    margin: 0 0 2rem;

    @media (max-width: 600px) { margin: 0 0 1rem; }

    >.btn-floating{
        @media (max-width: 600px) { 
            width: 40px;
            height: 40px;
        }

        >.material-icons{ 
            @media (max-width: 600px) { line-height: 0; } 
        }
    }
    >.search { border-bottom: 1px solid #CED4DA; }
  }
   .input-field input[type=text]:focus {
     border-bottom: 1px solid #CED4DA;
     box-shadow: 0 1px 0 0 #CED4DA;
   }
   
   .input-field input[type=text].valid {
     border-bottom: 1px solid #CED4DA;
     box-shadow: 0 1px 0 0 #CED4DA;
   }
   
   .input-field input[type=text].invalid {
     border-bottom: 1px solid #CED4DA;
     box-shadow: 0 1px 0 0 #CED4DA;
   }
   
}
</style>