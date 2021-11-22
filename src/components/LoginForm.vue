<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="5">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Авторизация</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              :rules="loginRules"
              label="Логин"
              name="username"
              prepend-icon="mdi-account"
              type="text"
              v-model="user.username"
              required
            ></v-text-field>

            <v-text-field
              :rules="passwordRules"
              id="password"
              label="Пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="user.password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="loading"
            @click="onSubmit"
            color="primary"
            >Войти</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IUser } from "../types/User";
import { VForm } from "../types/VForm";
import { errorFunc } from "../utils/errorFunc";

 name: "AppLogin"

@Component({})

export default class DoorParam extends Vue {
      valid = false
      loading = false
      loginRules = [(v: any) => !!v || "Пожалуйста, введите логин"]
      passwordRules = [(v: any) => !!v || "Пожалуйста, введите пароль"]
      authPath = this.$route.query.message || null
      user: IUser = {
        username: "",
        password: "",
      }

  mounted() {
      let authMsg = this.$route.query.message
      if (authMsg) {
        let msg = 'Пожалуйста авторизуйтесь в системе'
        let toast = this.$toasted.error(msg, {
          theme: "bubble",
          position: "top-center",
          duration: 5000,
        });
      }
    }
  
    public async onSubmit(): Promise<any> {
      this.loading = true;
      this.validate();

      if (this.valid === true) {
        try {
            let user = {
          username: this.user.username,
          password: this.user.password,
        } as IUser;

        this.reset();

         await this.$store.dispatch("login", user)
         this.$router.push('/')
         this.loading = false
        } catch (error) {
           let msg = errorFunc(this.$store.state.error);
            this.loading = false;
            let toast = this.$toasted.show(msg, {
              theme: "bubble",
              position: "top-center",
              duration: 5000,
            });
        }
      } else {
        this.loading = false;
        return;
      }
    }

    validate() {
      let form: any = this.$refs.form;
      form.validate();
    }
    reset() {
      let form: any = this.$refs.form;
      form.reset();
    }
}
</script>