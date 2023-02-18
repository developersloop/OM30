<template>
    <div class="list-pacientes">
        <div class="paciente-skils">
            <div class="input-field col s6">
                <input class="search validate" placeholder="Digite sua busca" id="search" type="text" v-model="search" @input="fetchPatient">
                <i class="search"></i>
            </div>
            <div class="title">
                <span>Nome</span>
                <span>CNS</span>
                <span>Actions</span>
            </div>
            <v-divider style="margin-top: 9px" />
            <paciente v-for="(item, index) in items" :key="index" message="Vitor Da Silva Vicente" />
            <div v-show="!items.length" class="no_pacientes">Não há pacientes cadastrados.</div>
        </div>
    </div>
</template>

<script>
import VDivider from '@/components/VDivider.vue';
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
            items: [1,2,3,4,5]
        }
    },
    methods: {
        fetchPatient: function(event) {
            const searched = event.target.value
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