<template>
   <div class="login-board">
    <div class="board-form">
        <div class="input-field">
          <input id="email" type="email" class="validate" autocomplete="off" v-model="email" @input="validate($event, 'email')">
          <label for="email" class="label-email">Digite seu e-email</label>
          <span v-show="errors.email.required.error || errors.email.invalid" class="red-text">{{ errors.email.message }}</span>
        </div>
        <div class="input-field">
          <input id="password" type="password" class="validate" autocomplete="off" v-model="password" @input="validate($event, 'password')">
          <label for="password" class="label-password">Digite sua senha</label>
          <span v-show="errors.password.required.error || errors.password.invalid" class="red-text">{{ errors.password.message }}</span>
        </div>
        <div class="button" :style="[disabled ? {'opacity': '0.1'} : {}]" role="button" @click="login(disabled)">Acessar</div>
    </div>
   </div>
</template>

<script>
//eslint-disable-next no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import { validate } from '../../utils'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errors: {
                email: {
                    touched: false,
                    required: {
                        error: false,
                    },
                    message: '',
                    invalid: false,
                },
                password: {
                    touched: false,
                    required: {
                        error: false
                    },
                    invalid: false,
                    message: ''
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            logged: 'login/logged'
        }),
        disabled: function() {
            return (!this.errors.email.touched || !this.errors.password.touched) || ((this.errors.email.touched && this.errors.password.touched) && (this.errors.email.invalid || this.errors.password.invalid))
        }
    },
    methods: {
        ...mapActions({
            isLogged: 'login/isLogged'
        }),
        login: function(isDisabled) {
            if (isDisabled) return
            else {
                const payload = {
                    email: this.email,
                    password: this.password
                }

                this.isLogged(payload)
                    .then(res => window.location.href = '/pacientes')
            }
        },
        validate: function(event, name) {
            const value = event.target.value
            const newName = name[0].toUpperCase() + name.substr(1)
            this.errors[name].touched = true

            if(!value) {
                this.errors[name].invalid = true
                this.errors[name].required.error = true
                this.errors[name].message = `${newName} é requirido.`
            }

            if(value && !validate(value, name)) {
                this.errors[name].invalid = true
                if (name === 'email') this.errors.email.message = `O ${newName} é inválido.`
                if (name === 'password') this.errors.password.message = 'Insira uma senha de no mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial.'
            }

            if (value && validate(value, name)) {
                this.errors[name].required.error = false
                this.errors[name].message = ''
                this.errors[name].invalid = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-board{
    background: rgba(255, 255, 255, 0.67);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    width: 500px;
    height: 402px;

    @media (max-width: 600px) { margin: 0 20px; }

    >.board-form{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: inherit;
        padding: 0 23px;

        >.input-field{
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            width: -webkit-fill-available;

            >.validate {
                @media (min-width: 601px) and (max-width: 1200px){ width: 294px; }
                @media (min-width: 1201px){ width: 294px; }
            }

            >.label-email,.label-password{
                @media (min-width: 601px) and (max-width: 1200px){ left: 83px; }
                @media (min-width: 1201px){ left: 83px; }
            }

            >.red-text{
                font-size: 11px;
                position: absolute;
                top: 45px;
                left: 79px;
                @media (max-width: 601px) { left: 0; }
            }
        }
        
        >.button{
            display: flex;
            justify-content: center;
            align-items: center;
            width: -webkit-fill-available;
            height: 44px;
            background: #26A69A;
            border-radius: 5px;
            color: #FFFFFF;
            font-style: normal;
            font-weight: 600;
            font-size: 19px;
            line-height: 23px;
            margin-top: 1rem;

            @media (min-width:  601px) and (max-width: 1200px){ width: 294px; }
            @media (min-width:  1201px){ width: 294px; }
        }
    }

}
</style>
