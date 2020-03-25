<template>
  <v-container>
    <v-simple-table fixed-header height="300px">
      <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody v-if="users && users.length">
      <tr v-for="user in users" :key="user.id">
        <td>{{user.name}}</td>
        <td>{{user.surname}}</td>
        <td>{{user.email}}</td>
        <td>{{user.phone}}</td>
        <td>
          <v-btn
            icon
            :to="{name: 'edit', params: {editUser: user}}"
            class="table__button"
            tag="button">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn icon @click="deleteUser(user.id)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="6" :style="{textAlign: 'center'}">Users not found</td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',

  computed: mapState(['users']),

  created() {
    this.getUsers();
  },

  methods: {
    ...mapActions(['getUsers', 'setUsers']),

    deleteUser(id) {
      this.setUsers(this.users.filter((user) => user.id !== id));
    },
  },
};
</script>
