<template>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <img src="@/assets/Shopping.png" alt="Image" height="150" width="300" class="rounded mx-auto d-block" />
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email   </label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-2">
                <div class="col-lg-4 offset-lg-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
                <div class="col-lg-4 offset-lg-4">
                <section id="firebaseui-auth-container"></section>
              </div></div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "firebase/auth";
//Vue.use(firebase)

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "Index" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  },
  mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
if (!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
}
        var uiConfig = {
            signInSuccessUrl: "/dashboard",
            signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
};
</script>