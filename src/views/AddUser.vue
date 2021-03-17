<template>
  <div>
    <b-modal id="addNewUser" title="Add User">
      <b-form>
        <b-form-group
          id="input-group-1"
          label="User Name:"
          label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.name"
            type="text"
            required
            placeholder="Enter User Name">
          </b-form-input>
          <span v-if="submitted && $v.user.name.$error" class="errorMsg">Please Enter User Name</span>
        </b-form-group>
          <b-form-group
          id="input-group-2"
          label="User Surname:"
          label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.surname"
            type="text"
            required
            placeholder="Enter User Surname">
          </b-form-input>
          <span v-if="submitted && $v.user.surname.$error" class="errorMsg">Please Enter User Surname</span>
        </b-form-group>
         <label for="example-datepicker">Birthday:</label>
    <b-form-datepicker id="example-datepicker"  v-model="user.birthday" class="mb-2"></b-form-datepicker>
       <b-form-group label="Gender:" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="Male">Male</b-form-radio>
      <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="Female">Female</b-form-radio>
    </b-form-group>
   <b-form-group id="input-group-3" label="Birth Place:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="user.place"
          :options="places"
          required
        ></b-form-select>
      </b-form-group>
      
        <b-form-group
          id="input-group-3"
          label="User Email:"
          label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter User Email">
          </b-form-input>
          <div v-if="submitted && $v.user.email.$error" class="errorMsg">
            <span v-if="!$v.user.email.required">Please Enter Email address</span>
            <span v-if="$v.user.email && !$v.user.email.email">Please Enter Valid Email address</span>
          </div>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right m-l-10"
            @click="submitForm">
            Save
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="resetForm">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BForm } from 'bootstrap-vue'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'add_new_user',
  data () {
    return {
      user: {
        name: '',
        surname: '',
        email: '',
        birthday: '',
        gender: '',
        place: null
      },
      places: [{ text: 'Select One', value: null }, 'Vushtrri', 'Prishtine', 'Mitrovice', 'Peje'],
      submitted: false
    }
  },
  validations: {
    user: {
      name: { required },
      surname: { required },
      email: { required, email },
    }
  },
  mounted () {
    this.$root.$on('edit-user', (data) => {
      this.user = data
      this.user.isEdit = true
      this.submitted = false
    })
    this.$root.$on('add-user', (data) => {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    })
  },
  components: {
    'b-modal': BModal,
    'b-form': BForm
  },
  methods: {
    submitForm () {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$bvModal.hide('addNewUser')
      this.$store.dispatch('updatelistUser', { user: this.user })
    },
    resetForm () {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    }
  }
}
</script>

<style>

</style>
