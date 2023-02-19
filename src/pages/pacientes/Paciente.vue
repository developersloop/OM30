<template>
    <div v-if="!rerender">
        <div class="thread-paciente">
            <div class="avatar-paciente">
                <div class="profile" :style="[patient?.avatar ? { 'background': `url(${patient.avatar})`, 'background-size': 'cover' } : {} ]"></div>
                <div class="alt">{{ formatName }}</div>
            </div>
            <span class="cns-label">{{ patient.cns }}</span>
            <div class="icons-actions_paciente -opacity">
                <i class="sm material-icons" @click="edit(patient?.id)">create</i>&nbsp;&nbsp;
                <i class="sm material-icons" @click="deleted(patient?.id)">delete</i>
            </div>
        </div>
        <v-divider />
    </div>
</template>

<script>
import VDivider from '@/components/VDivider.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Paciente',
    props:{
        patient: {
            type: Object,
            required: true
        }
    },
    components: {
        'v-divider': VDivider
    },
    data() {
        return {
            rerender: false
        }
    },
    watch: {
        rerender: {
            immediate: true,
            handler(val, oldVal) {
                this.rerender = val
            }
        }
    },
    methods: {
        ...mapActions({
            deletePatient: 'pacientes/deletePatient'
        }),
        deleted(id) {
            this.deletePatient(id).finally(_ => this.rerender = true)
        },
        edit(id) {
            this.$router.push({ name: 'edita-pacientes', params: { id, }})
        }
    },
    computed: {
        ...mapGetters({
            'patients': 'pacientes/patients'
        }),
        formatName: function() {
            return this.patient.name?.split(' ').slice(0, 1).join(' ');
        }
    },
}
</script>

<style lang="scss" scoped>
.thread-paciente{
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) { padding: 10px 0; }
    
    >.avatar-paciente{
        display: flex;
        align-items: center;
        >.profile{
            width: 55px;
            height: 55px;
            border-radius: 100px;
            background-size: cover;
    
            @media (max-width: 600px) { 
                width: 40px;
                height: 40px;
            }
        }

        >.alt{
            font-weight: 500;
            font-size: 1.3em;
            line-height: 22px;
            padding-left: 10px;

            @media (max-width: 600px) { font-size: 0.9em; }
        }
    }

    >.cns-label {
        font-weight: 500;
        font-size: 1.3em;
        line-height: 22px;

        @media (max-width: 600px) { font-size: 0.9em; }
    }

    >.icons-actions_paciente{
        cursor: pointer;

        >.material-icons{ 
            font-size: 1.7em;
            @media (max-width: 600px) { font-size: 1.4em; }
         }
        

        &.-opacity{ color: #B7B7B7; }
    }
}
</style>