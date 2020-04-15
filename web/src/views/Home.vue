<template>
  <section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form onclick="return false;"  class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="envelope"/>                  
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" required>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="lock"/>                  
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="checkbox">
                <input type="checkbox">
               Remember me
              </label>
            </div>
            <div class="field">
              <button @click="login" class="button is-success">
                Login
              </button>
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faLock);

// import HelloWorld from '@/components/HelloWorld.vue'
//import GraphQLExample from '@/components/GraphQLExample.vue'

export default class Home extends Vue {

  login(){
    /*
    mutation MyMutation {
      __typename
      authenticate(input: {email: "", password: ""})
    }

    if (success) {
      localStorage.set("jwt", token);
      redirect("home");
    }
    */
  }
  
}
</script>
