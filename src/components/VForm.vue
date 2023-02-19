<template>
    <div class="fields">
        <div v-for="(amount, index) in amountFields" :key="index" class="input-field inline">
            <input
                :id="'input-'+amount" 
                :ref="'input-'+amount" 
                style="margin-bottom: 0;"
                v-model="patient[amount]"
                type="text"
                v-mask="amount == 'cpf' ? '###.###.###-##' : (amount == 'cep' ? '#####-###' : (amount == 'cns' ? '###.####.####.####' : (amount == 'date' ? '##/##/####' : '')))"
                class="validate"
                :disabled="isEdit && (amount == 'cpf' || amount == 'cns') "
                @input="handler(amount, 'input')"
                @focusout="handler(amount, 'focus')"
            />
            <label :id="'label-'+amount" :for="'input-'+index">Digite {{ amount == 'name_mom' ? 'o nome da mãe' : (amount == 'date' ? 'sua data de nascimento' : (amount == 'uf' ? 'o estado' : `o ${amount}`)) }}</label>
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
            <button  
                :style="[(invalidPatientEdit || !invalidForm) ? {'opacity': '0.1'} : {}]" 
                class="waves-effect waves-light btn" 
                role="button" 
                @click="submit()"
            >{{ isEdit ? 'Editar' : 'Cadastrar'}}</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { 
    uploadImage,
    validCpf, 
    validaCns, 
    viaCep, 
    defaultAvatar 
} from '@/utils'

export default {
    name: 'VForm',
    props: {
        format: {
            type: Object,
            required: true
        },
        isFile: {
            type: Boolean
        },
        paciente: {
            type: Object
        },
        pacientId: {
            type: [Number, String]
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
            isEdit: false
        }
    },
    watch: {
        paciente: {
            immediate: true,
            deep: true,
            handler(oldValue, value) {
                if(oldValue) {
                    this.patient = {...oldValue}
                    delete this.patient?.avatar
                    delete this.patient?.id

                    this.isEdit = true
                    
                    Object.keys(oldValue).map(key => {
                        if(this.validRequiredInputsForm[key]?.error) {
                            this.validRequiredInputsForm[key].error.invalid = false
                        }
                    })
                }

            }
        }
    },
    mounted() {
        this.amountFields = Object.keys(this.patient)
        if(this.isEdit) {
            this.$nextTick(() => {
                Object.keys(this.patient).map(val => {
                    if(val !== 'avatar') document.getElementById(`label-${val}`).classList.add('active')
                })
            })
        }
    },
    methods: {
        ...mapActions({
            'storePatient': 'pacientes/storePatient',
            'updatePatient': 'pacientes/updatePatient'
        }),
        file($event) {
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
             
            if (!allowedExtensions.exec($event.target.value)) {
                alert('Arquivo inválido.');
                $event.target.value = '';
                return false;
            }
            else uploadImage($event).then(image => this.patient.avatar = image)
        },
        cleanValidation: function(amount) {
            this.validRequiredInputsForm[amount].error.invalid = false
            this.validRequiredInputsForm[amount].error.message = ''
        },
        handler(amount, nameEvent) {
            if(Object.keys(this.validRequiredInputsForm).includes(amount)) {
                if(!this.patient[amount]) {
                    this.validRequiredInputsForm[amount].touched = true
                    this.validRequiredInputsForm[amount].error.invalid = true
                    this.validRequiredInputsForm[amount].error.message = 'Campo é requirido'
                }
                else this.cleanValidation(amount)
            }
            
            if(amount == 'cpf' && nameEvent == 'focus' && this.patient[amount]) {
                const cleanCpf = this.patient[amount].replace(/[^0-9]/g, '')

                if(!validCpf(cleanCpf)) {
                    this.validRequiredInputsForm[amount].error.invalid = true
                    this.validRequiredInputsForm[amount].error.message = 'Insira um cpf válido'
                }
                else this.cleanValidation(amount)
            }
            
            if(amount == 'cns' && nameEvent == 'focus' && this.patient[amount]) {
                const cleanCns = this.patient[amount].replace(/[^0-9]/g, '')
                if(!validaCns(cleanCns)) {
                    this.validRequiredInputsForm[amount].error.invalid = true
                    this.validRequiredInputsForm[amount].error.message = 'Insira um cns válido'
                }
                else this.cleanValidation(amount)
            }

            if(amount == 'cep' && nameEvent == 'focus' && this.patient[amount]) {
                const cleanCep = this.patient[amount].replace(/[^0-9]/g, '')
                viaCep(cleanCep)
                    .then(({ data }) => {
                        if(data?.erro) {
                            this.validRequiredInputsForm[amount].error.invalid = true
                            this.validRequiredInputsForm[amount].error.message = 'Insira um cep válido'
                        }
                        else {    
                            this.patient.logradouro = data?.logradouro
                            this.patient.complemento = data?.complemento
                            this.patient.bairro = data?.bairro
                            this.patient.localidade = data?.localidade
                            this.patient.uf = data?.uf

                            document.getElementById('label-bairro').classList.add('active')
                            document.getElementById('label-logradouro').classList.add('active')
                            document.getElementById('label-complemento').classList.add('active')
                            document.getElementById('label-localidade').classList.add('active')
                            document.getElementById('label-uf').classList.add('active')
                            document.getElementById('label-bairro').classList.add('active')
                        }
                    })
                    .catch(_ => {
                        this.validRequiredInputsForm[amount].invalid = true
                        this.validRequiredInputsForm[amount].error.message = 'Insira um cep válido'
                    })
            }
        },
        submit() {
            if(!Object.values(this.validRequiredInputsForm).every(fill => !fill.error.invalid)) return
            else {
                if (!this.patient?.avatar) this.patient.avatar = defaultAvatar()
                
                if(this.isEdit) {
                    this.updatePatient({ id: this.pacientId, payload: this.patient }).then(_ => this.$emit('rerender'))
                    return
                }
                
                this.storePatient(this.patient).then(_ => this.$emit('rerender'))
            } 
        }
    },
    computed: {
        fieldsApplyValidation: function() {
            return Object.keys(this.validRequiredInputsForm)
        },
        invalidPatientEdit: function() {
            return this.isEdit && !Object.keys(this.validRequiredInputsForm).every(k => this.paciente[k])
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