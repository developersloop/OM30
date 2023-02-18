<template>
    <div>
        <div class="thread-paciente">
            <div class="avatar-paciente">
                <div class="profile"></div>
                <div class="alt">{{ formatedMessage }}</div>
            </div>
            <span class="cns-label">898 000 8577 4482</span>
            <div class="icons-actions_paciente -opacity">
                <i class="sm material-icons">create</i>&nbsp;&nbsp;
                <i class="sm material-icons">delete</i>
            </div>
        </div>
        <v-divider />
    </div>
</template>

<script>
import VDivider from '@/components/VDivider.vue';

export default {
    name: 'Paciente',
    props:['message'],
    components: {
        'v-divider': VDivider
    },
    data() {
        return {

        }
    },
    computed: {
        formatedMessage: function() {
            return this.message.split(' ').slice(0, 1).join(' ');
        }
    }
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
            background: url('https://placekitten.com/400/400');
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