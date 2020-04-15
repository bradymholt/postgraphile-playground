<template>
  <div class="apollo-example">  
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="gql => gql`
        query MyQuery {
          migrations {
            nodes {
              id, name
            }
          }
        }
     `">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <table>
            <tr v-for="item in data.migrations.nodes" v-bind:key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>              
            </tr>
          </table>          
         </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () { 
    return {};   
  }
}
</script>

<style scoped>
</style>
