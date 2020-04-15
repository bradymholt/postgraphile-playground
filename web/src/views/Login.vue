<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form onclick="return false;" class="box">
              <div v-if="isInvalidLogin" class="notification is-danger">
                Invalid login. Check credentials and try again.
              </div>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    v-model="email"
                    placeholder="john.doe@gmail.com"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    v-model="password"
                    placeholder="*******"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <button @click="login" class="button is-success">
                  Login
                </button>
              </div>
              <div v-if="isLoggedIn">
                Logged In!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

library.add(faEnvelope, faLock);

@Component
export default class Login extends Vue {
  isLoggedIn = false;
  isInvalidLogin = false;

  // Using seed data for defaults
  email = "john.doe@gmail.com";
  password = "123456!";

  async login() {
    const result = await this.$apollo.mutate({
      mutation: gql`
        mutation AuthenticateMution($input: AuthenticateInput!) {
          authenticate(input: $input) {
            jwtToken
          }
        }
      `,
      variables: {
        input: {
          email: this.email,
          password: this.password,
        },
      },
    });

    const token = result.data.authenticate.jwtToken;
    if (!!token) {
      this.isInvalidLogin = false;
      this.isLoggedIn = true;

      localStorage.setItem("jwt", token);
      this.$router.push("/");
    } else {
      this.isInvalidLogin = true;
    }
  }
}
</script>
