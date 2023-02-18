<template>
    <div class="fields">
        <div v-for="(amount, index) in amountFields" :key="index" class="input-field inline">
            <input
                :id="'input-'+index" 
                style="margin-bottom: 0;"
                v-model="patient[amount]"
                type="text"
                class="validate"
                @input="handler(amount)"
                @focusout="handler(amount)"
            />
            <label :for="'input-'+index">Digite {{ amount == 'name_mom' ? 'o nome da mãe' : (amount == 'date' ? 'sua data de nascimento' : (amount == 'uf' ? 'o estado' : `o ${amount}`)) }}</label>
            <span style="color: red" v-if="(fieldsApplyValidation.includes(amount) && validRequiredInputsForm[amount]?.error?.invalid)">{{ validRequiredInputsForm[amount]?.error?.message }}</span>
        </div>
        <div class="submit-file">
            <div class="file-field input-field">
                <div class="btn btn-sm">
                    <span>File</span>
                    <input type="file" @change="file($event)">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Insira uma foto.">
                </div>
            </div>
            <button  :style="[!invalidForm ? {'opacity': '1'} : {}]" class="waves-effect waves-light btn" role="button" @click="cadastrar()">Cadastrar</button>
        </div>
    </div>
</template>
<script>
import { uploadImage } from '@/utils'

export default {
    name: 'VForm',
    props: {
        format: {
            type: Object,
            required: true
        },
        isFile: {
            type: Boolean
        }  
    },
    data() {
        return {
            patient: {...this.format},
            amountFields: null,
            validRequiredInputsForm: {
                name: {
                    required: true,
                    touched: false,
                    error: {
                        invalid: true,
                        message: ''
                    }
                },
                date: {
                    required: true,
                    touched: false,
                    error: {
                        invalid: true,
                        message: ''
                    }
                },
                cpf: {
                    required: true,
                    touched: false,
                    error: {
                        invalid: true,
                        message: ''
                    }
                },
                cns: {
                    required: true,
                    touched: false,
                    error: {
                        invalid: true,
                        message: ''
                    }
                },
                cep: {
                    required: true,
                    touched: false,
                    error: {
                        invalid: true,
                        message: ''
                    }
                }
            },
        }
    },
    mounted() {
        this.amountFields = Object.keys(this.patient)
    },
    methods: {
        file($event) {
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
             
            if (!allowedExtensions.exec($event.target.value)) {
                alert('Arquivo inválido.');
                $event.target.value = '';
                return false;
            }
            else uploadImage($event).then(image => this.patient.avatar = image)
        },
        handler(amount) {
            if(Object.keys(this.validRequiredInputsForm).includes(amount)) {
                if(!this.patient[amount]) {
                    this.validRequiredInputsForm[amount].touched = true
                    this.validRequiredInputsForm[amount].error.invalid = true
                    this.validRequiredInputsForm[amount].error.message = 'Campo é requirido'
                }
                else {
                    this.validRequiredInputsForm[amount].error.invalid = false
                    this.validRequiredInputsForm[amount].error.message = ''
                }
            }

            
        },
        cadastrar() {
            if(!Object.values(this.validRequiredInputsForm).every(fill => !fill.error.invalid)) return
            else alert('adad')   
        }
    },
    computed: {
        fieldsApplyValidation: function() {
            return Object.keys(this.validRequiredInputsForm)
        },
        invalidForm: function() {
            return Object.values(this.validRequiredInputsForm).every(fill => !fill.error.invalid)
        }
    }
}
</script>
<style lang="scss" scoped>
.fields{
    @media (min-width: 601px) { padding: 20px; }
    >.input-field{
        width:  -webkit-fill-available;
        @media (min-width: 601px) { 
            width: 300px;
            margin: 20px;
        }

    }

    >.submit-file{
        @media (min-width: 601px) { 
            display: flex;
            flex-flow: row-reverse;
            justify-content: space-between;
         }

        >.btn{
            @media (max-width: 600px) { width: -webkit-fill-available; }
            @media (min-width: 601px) { margin-left: 20px; margin-top: 30px; }
        }

        >.file-field{
            @media (min-width: 601px) { margin: -59px 66px; width: 301px;}
        }
    }
}
</style>