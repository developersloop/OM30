<template>
    <div v-if="!rerender">
        <div class="thread-paciente">
            <div class="avatar-paciente">
                <div class="profile"></div>
                <div class="alt">{{ formatName }}</div>
            </div>
            <span class="cns-label">{{ patient.cns }}</span>
            <div class="icons-actions_paciente -opacity">
                <i class="sm material-icons">create</i>&nbsp;&nbsp;
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
        }
    },
    computed: {
        ...mapGetters({
            'patients': 'pacientes/patients'
        }),
        formatName: function() {
            return this.patient.name.split(' ').slice(0, 1).join(' ');
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
            background: url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ0NDQ8NDQ0OEA0NDQ0NDQ8ODQ4QFREWFhcRFhMYHSggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQQFAwIH/8QALxABAAECBAQFAwMFAAAAAAAAAAECAwQRITESQVFxIjJhgdFCkaGCscEFFDNikv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEUAAAAAAAAAEBR5VX6I+qPbV8Ti6PX7A0DP8A3dHr9n3TiKJ+qPfQHqJE9NeygAAAAAAAAAAAACKAAAAAAA+a64pjOZyh5378U6b1dPlgrrmqc5nOQaLmMnamMvWd/szVVzO8zPdAAAAAFpqmNpmOzRbxkx5vFHXaWYB1LdyKozifmH25NNUxOcTlLdh8TFWk6VfiQaAAAAAAAAAAAAAAAAHjib3DGnmnb5eldcUxMztDl3K5qmZnmCTOes6yAAAAAAAAAAADdhb/ABeGfNH5aXIicpiY3h07Nzipifv6SD0AAAAABFRQAAAAASZBjx1zWKY5az3ZVrqzmZ6zmgAAAAAAAAAAAAD3wdzKrLlVp7vAB1x826s4iesZvoAAAAEVFAAAAAeWJqyoq7Zfd6s+Nnwe8A56gAAAAAAAAAAAAAADfgqs6O0zDQyf0+dKu8NYAAAAIqKAAAAAz47ye8NDxxUZ0VfcHOEUAAAAAAAAAAAAAAGz+n7Vd4a2bAx4M+sy0gAAAAigAAAAAkxnEx10UByKoymYnlOQ0Y23lVxcp37s4AAAAAAAAAAAAAPXC2+KuOkayDfapypiOkPsAAAAARQAAAAAAB8XbcVUzE+3pLmVUzEzE7w6zNirHF4o80fmAYQAAAAAAAAAAAHSw9rhpy5zrLxwlj66v0x/LWAAAAAACKigAAAAAAAAzYnDcXip0q59JYZjLSdJdK5fpp3nOekayx37/F9MR68weIAAAAAAADZh8L9VftT8s9i7wznlE+vNtt4mmrnlPSQewAAAAAAAIqKAAAAADLiMVlpTrPOeUA9rt6mnfflEbsV3E1Vf6x0j5eMznrOs9QEUAAAAAAAAAAAelq/VTtOcdJbbOIpq9J6S5wDrjFYxXKv/AK+WwFAAAAEUAAAGLF3/AKKf1T/AJicTn4aduc9WYABAFEAUQBQAAAAAAAAAHvhsRw6TrT+zwAdaJz1jZXPwt/hnhnyz+HQAAAEUAEqqyiZnaAeOKvcMZR5p/Hq576uVzVM1Tz/EPkAAEAAAAAAAAAAAAAAAAABW3B3s44Z3jb1hiKZymJjeNQdcfFqvipiY5/u+wAAGTHXNqY56y1uVdr4qpnrOnYHyAAACAAAAAAAQAAAAAEgAAAQAoANOCuZTNPXWO7c5FM5TExvGrq01ZxExz1B9AA+bnlntLkwoAAAACAAAAAAAAAAAAAAAAAAoADpYX/HT2AHqAD//2Q==");
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