<template>
  <main class="section">
    <div class="container">

      <h1 class="title">Profile</h1>

      <div v-if="notification.type" :class="['notification', notification.type]">
        <button class="delete" @click="notification = {}"></button>
        {{ notification.message }}
      </div>

      <form class="columns is-multiline" @submit.prevent="save($event)">

        <!--| FIRST NAME |-->
        <div class="column is-6">
          <label class="label">First Name</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="firstName" v-model="profile.firstName">
            <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
          </p>
        </div>

        <!--| LAST NAME |-->
        <div class="column is-6">
          <label class="label">Last Name</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="lastName" v-model="profile.lastName">
            <span class="icon is-small is-left"><i class="fa fa-user"></i></span>
          </p>
        </div>

        <!--| EMAIL |-->
        <div class="column is-6">
          <label class="label">Email</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="email" v-model="profile.email">
            <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
          </p>
        </div>

        <!--| PHONE |-->
        <div class="column is-6">
          <label class="label">Phone</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="phone" v-model="profile.phone">
            <span class="icon is-small is-left"><i class="fa fa-phone"></i></span>
          </p>
        </div>

        <!--| STREET |-->
        <div class="column is-5">
          <label class="label">Street</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="street" v-model="profile.street">
            <span class="icon is-small is-left"><i class="fa fa-map-marker"></i></span>
          </p>
        </div>

        <!--| CITY |-->
        <div class="column is-4">
          <label class="label">City</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="city" v-model="profile.city">
            <span class="icon is-small is-left"><i class="fa fa-map-marker"></i></span>
          </p>
        </div>

        <!--| POSTCODE |-->
        <div class="column is-3">
          <label class="label">Post code</label>
          <p class="control has-icons-left">
            <input class="input" type="text" name="postcode" v-model="profile.postcode">
            <span class="icon is-small is-left"><i class="fa fa-map-marker"></i></span>
          </p>
        </div>

        <div class="column is-6">

          <!--| STATE |-->
          <div class="field">
            <label class="label">State</label>
            <p class="control has-icons-left">
              <input class="input" type="text" name="state" v-model="profile.state">
              <span class="icon is-small is-left"><i class="fa fa-globe"></i></span>
            </p>
          </div>

          <!--| COMPANY NAME |-->
          <div class="field">
            <label class="label">Company Name</label>
            <p class="control has-icons-left">
              <input class="input" type="text" name="companyName" v-model="profile.companyName">
              <span class="icon is-small is-left"><i class="fa fa-building"></i></span>
            </p>
          </div>

        </div>

        <!--| LOGO UPLOAD |-->
        <div class="column is-6">

          <!--| Cuntry |-->
          <div class="field">
            <label class="label">Country</label>
            <p class="control has-icons-left">
              <input class="input" type="text" name="country" v-model="profile.country">
              <span class="icon is-small is-left"><i class="fa fa-globe"></i></span>
            </p>
          </div>

          <div class="dropbox">
            <i class="fa fa-download"></i>
            <input class="input-file" type="file" name="logo" accept="image/*" @change="fileChange($event.target)">

            <div v-if="preview" class="preview">
              <img :src="preview" alt="Logo" class="preview__img">
              <i class="fa fa-trash preview__remove" @click="removeFile"></i>
            </div>
          </div>

        </div>

        <div class="column has-text-centered">
          <button type="submit" class="button is-primary">Save</button>
        </div>

      </form>

    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { BASE_URL, USER_PROFILE_URL } from '@/config'

export default {
  data () {
    return {
      profile: {},
      preview: '',
      notification: {}
    }
  },
  created () {
    this.fetchProfile()
  },
  methods: {
    fetchProfile () {
      axios.get(USER_PROFILE_URL).then(res => {
        // Set logo preview.
        if (res.data.logo) {
          this.preview = BASE_URL + res.data.logo
        }
        this.profile = res.data
      }).catch(function (err) {
        console.log(err)
      })
    },
    fileChange (input) {
      if (input.files) {
        this.profile.logo = input.files[0]

        var reader = new FileReader()
        reader.onload = event => {
          this.preview = event.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    removeFile () {
      this.profile.logo = ''
      this.preview = ''
    },
    save () {
      // Prepare form data.
      var data = new FormData()
      for (var field in this.profile) {
        data.append(field, this.profile[field])
      }

      axios.put(USER_PROFILE_URL, data).then(res => {
        this.notification = {
          type: 'is-success',
          message: 'Profile has been saved.'
        }
      }).catch((err) => {
        this.notification = {
          type: 'is-danger',
          message: err.response.data.message
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    overflow: hidden;

    p {
      font-size: 1.2em;
      text-align: center;
      padding: 50px 0;
    }

    .fa-download {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 30px;
    }

    &:hover {
      background: lightblue; /* when mouse over to the drop zone, change color */
    }
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .preview {
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: default;

    &__img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      max-width: 100%;
      max-height: 100%;
    }

    &__remove {
      position: absolute;
      right: 0;
      top: 0;
      left: auto;
      width: 30px;
      display: block;
      font-size: 24px;
      cursor: pointer;

      &:hover { color: #f44336; }
    }
  }

  .container { max-width: 620px; }
</style>
