<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">
                Contacts
              </h1>
            </div>
            <div class="column has-text-right">
              <button class="button" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contactsList" :key="contact.id">
              <td>{{ contact.firstName }} </td>
              <td>{{ contact.lastName }} </td>
              <td>{{ contact.emailAddress }} </td>
              <td>{{ contact.phoneNumber }} </td>
            </tr>
          </tbody>
        </table>        
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import gql from "graphql-tag";

@Component({
  apollo: {
    contactsList: gql`
      query {
        contactsList {
          id,
          firstName
          lastName
          emailAddress
          phoneNumber
        }
      }
    `,
  },
})
export default class Contacts extends Vue {
  contactsList = [];

  logout() {
    localStorage.removeItem("jwt");
    this.$router.push("/login");
  }
}
</script>

query { contactsList { emailAddress firstName lastName phoneNumber } }
