<template>
  <div class="home">
    <h3 class="heading">Users</h3>
    <div style="float:right;margin:10px;">
      <b-button size="sm" @click="addUser">Add New User</b-button>
    </div>
    <b-table striped hover :items="bindListUsers" responsive="sm" :fields="fields" show-empty>
      <template v-slot:cell(action)="data">
        <b-button size="sm" class="mr-1" @click="editUser(data)">
          Edit
        </b-button>
        <b-button size="sm" @click="deleteUser(data)">
          Delete
        </b-button>
      </template>
      <template v-slot:cell(name)="data">
        <p>{{data.value}}</p>
      </template>
    </b-table>
 
    <AddUser />
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import AddUser from './AddUser.vue'

export default {
  name: 'Home',
  components: {
    'b-table': BTable,
    AddUser
  },
  data () {
    return {
      fields: [
        {
          key: 'name', label: 'User Name'
        },
        {
          key: 'surname', label: 'User Surname'
        },
        {
          key: 'email', label: 'Email'
        },
        {
          key: 'birthday', label: 'Birthday'
        },
         {
          key: 'place', label: 'Place'
        },
         {
          key: 'gender', label: 'Gender'
        },
        {
          key: 'action', label: 'Actions'
        }
      ],
     
    }
  },
  computed: {
 
    bindListUsers () {
      return this.$store.state.listUser
    }
  },
  watch: {
    bindListUsers: {
      deep: true,
      handler: function (list) {
        this.totalRows = list.length
      }
    }
  },
  created () {
    this.loadlistUsers()
  },
  methods: {
    loadlistUsers () {
      this.totalRows = this.$store.state.listUser.length
    },
    addUser () {
      this.$root.$emit('add-user', {})
      this.$bvModal.show('addNewUser')
    },
    editUser (user) {
      this.$root.$emit('edit-user', Object.assign({}, user.item))
      this.$bvModal.show('addNewUser')
    },
    deleteUser(user) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete user.', {
        title: 'Please Confirm',
        size: 'mm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((value) => {
          if (value) {
            this.$store.dispatch('deleteStoreUser', { user: user })
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
   
  }
}
</script>
