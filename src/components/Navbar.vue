<template>

  <b-navbar toggleable="lg" type="dark" variant="info">
    <div class="container">
      <router-link to="/" class="navbar-brand">Tienda Online</router-link>
      <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>
        <!--<span class="navbar-toggler-icon"></span>-->
      
      <b-collapse id="navbarSupportedContent" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="user.loggedIn">
            
            <b-nav-item href="#" right disabled >{{user.data.displayName}}</b-nav-item>
             <b-nav-item right>
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </b-nav-item>
          </template>
          <template v-else right>
            
            <b-nav-item href="#" right>
              <router-link to="login" class="nav-link" >Login</router-link>
            </b-nav-item>
            <b-nav-item href="#" right>
              <router-link to="register" class="nav-link" >Register</router-link>
            </b-nav-item>
            
          </template>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
  
</template>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  }
};

</script>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    
