<template>
  <div class="col m10 offset-m1 xl8 offset-xl2">

    <h4>Profile</h4>

    <form id="form" @submit.prevent="save($event)">

      <div class="row">

        <!--| FIRST NAME |-->
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <label for="first-name" class="active">First Name</label>
          <input id="first-name" type="text" class="validate" name="first-name" v-model="profile.firstName">
        </div>

        <!--| LAST NAME |-->
        <div class="input-field col s6">
          <label for="last-name" class="active">Last Name</label>
          <input id="last-name" type="text" class="validate" name="last-name" v-model="profile.lastName">
        </div>

        <div class="col s6">

          <!--| EMAIL |-->
          <div class="input-field">
            <i class="material-icons prefix">email</i>
            <label for="email" class="active">Email Address</label>
            <input id="email" type="email" class="validate" name="email" required v-model="profile.email">
          </div>

          <!--| PHONE |-->
          <div class="input-field">
            <i class="material-icons prefix">phone</i>
            <label for="phone" class="active">Telephone Number</label>
            <input id="phone" type="text" class="validate" name="phone" v-model="profile.phone">
          </div>

        </div>

        <div class="col s6">

          <!--| LOGO UPLOAD |-->
          <div class="dropbox">
            <i class="large material-icons">perm_media</i>
            <input class="input-file" type="file" name="logo" accept="image/*" @change="fileChange($event.target)">

            <template v-if="profile.logo">
              <div class="preview" :style="{ backgroundImage: previewUrl }"></div>
              <i class="material-icons preview__remove" @click="removePreview">delete</i>
            </template>

          </div>

          <br>

          <!--| SUBMIT BTN |-->
          <button class="btn waves-effect waves-light right red">Save
            <i class="material-icons right">send</i>
          </button>

          <input type="hidden" name="_id" v-model="profile._id">

        </div>

      </div>

    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    profile () {
      return this.$store.getters.userProfile
    },
    previewUrl () {
      console.log('log')
      return 'url(' + this.profile.logo + ')'
    }
  },
  methods: {
    fileChange (input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = event => {
          this.profile.logo = event.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    removePreview () {
      this.profile.logo = ''
    },
    save (event) {
      var formData = new FormData(event.target)
      axios.put('http://localhost:3000/api/users', formData, {
        headers: {'Authorization': this.$store.getters.authToken}
      })
      .then(res => {
        if (res.data.success) {
          console.log('Update Profile')
          this.$store.state.auth.userProfile = this.profile
        }
      })
    }
  }
}
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    height: 0;
    padding-bottom: 50%;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .dropbox .material-icons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 30px;
  }

  .dropbox .preview {
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .dropbox .preview__remove {
    position: absolute;
    right: -6px;
    top: 15px;
    left: auto;
    width: 30px;
    background: #fff;
    display: block;

  }
  .dropbox .preview__remove:hover {
    color: #f44336;
  }
</style>
