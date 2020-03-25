/* eslint-disable max-len */
<template>
  <v-container>
    <v-btn
      color="primary"
      @click="statusForm = 'edit'"
    >
      Add user
    </v-btn>
    <v-btn
      color="primary"
      @click="statusForm = 'json'"
    >
      Add json
    </v-btn>
    <form
      v-if="statusForm === 'edit'"
      class="form"
      @submit.prevent="handleEditSubmit" >
      <v-text-field
        :error-messages="nameErrors"
        :counter="15"
        v-model.trim="user.name"
        @blur="$v.user.name.$touch()"
        label="Name"
      ></v-text-field>
      <v-text-field
        :error-messages="surnameErrors"
        :counter="15"
        v-model.trim="user.surname"
        @blur="$v.user.surname.$touch()"
        label="Surname"
      ></v-text-field>
      <v-text-field
        v-model.trim="user.email"
        :error-messages="emailErrors"
        @blur="$v.user.email.$touch()"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model.trim="user.phone"
        :error-messages="phoneErrors"
        @blur="$v.user.phone.$touch()"
        label="Phone"
      ></v-text-field>
      <v-btn
        color="success"
        @click="handleEditSubmit"
        :disabled="$v.user.$invalid"
      >
        Add
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </form>

    <form
      v-else
      @submit.prevent="handleJsonSubmit"
    >
      <v-textarea
        v-model.trim="jsonUser"
        :error-messages="jsonErrors"
        label="Add json"
        counter="true"
        @blur="$v.jsonUser.$touch()"
      ></v-textarea>
      <v-btn
        color="success"
        @click="handleJsonSubmit"
        :disabled="$v.jsonUser.$invalid"
      >
        Add
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import {
  required, email, maxLength, numeric,
} from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import uuidv4 from 'uuid/v4';

const validateJSON = (value) => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export default {
  props: {
    editUser: {
      type: Object,
      default() {
        return {
          name: '',
          surname: '',
          email: '',
          phone: '',
        };
      },
    },
  },

  validations: {
    user: {
      name: {
        required,
        maxLength: maxLength(15),
      },
      surname: {
        required,
        maxLength: maxLength(15),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
      },
    },
    jsonUser: {
      required,
      validateJSON,
    },
  },

  data() {
    return {
      user: {
        name: this.editUser.name,
        surname: this.editUser.surname,
        email: this.editUser.email,
        phone: this.editUser.phone,
      },
      statusForm: 'edit',
      jsonUser: '',
    };
  },

  computed: {
    ...mapState(['users']),

    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      if (!this.$v.user.name.maxLength && errors) {
        errors.push('Name must be at most 15 characters long');
      } else if (!this.$v.user.name.required && errors) {
        errors.push('Name is required.');
      }
      return errors;
    },

    surnameErrors() {
      const errors = [];
      if (!this.$v.user.surname.$dirty) return errors;
      if (!this.$v.user.surname.maxLength && errors) {
        errors.push('Surname must be at most 15 characters long');
      } else if (!this.$v.user.surname.required && errors) {
        errors.push('Surame is required.');
      }
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      if (!this.$v.user.email.email && errors) {
        errors.push('Must be valid e-mail');
      } else if (!this.$v.user.email.required && errors) {
        errors.push('E-mail is required');
      }
      return errors;
    },

    phoneErrors() {
      const errors = [];
      if (!this.$v.user.phone.$dirty) return errors;
      if (!this.$v.user.phone.numeric && errors) {
        errors.push('Phone must be only numeric');
      } else if (!this.$v.user.phone.required && errors) {
        errors.push('Phone is required');
      }
      return errors;
    },

    jsonErrors() {
      const errors = [];
      if (!this.$v.jsonUser.$dirty) return errors;
      if (!this.$v.jsonUser.validateJSON && errors) {
        errors.push('Must be valid');
      } else if (!this.$v.jsonUser.required && errors) {
        errors.push('JSON is required');
      }
      return errors;
    },
  },

  created() {
    this.getUsers();
  },

  methods: {
    ...mapActions(['getUsers', 'setUsers']),

    handleEditSubmit() {
      if (!this.$v.user.$invalid) {
        let updateUser;
        if (this.editUser.id) {
          updateUser = this.users.map((user) => {
            if (user.id === this.editUser.id) {
              return {
                ...user,
                name: this.user.name,
                surname: this.user.surname,
                phone: this.user.phone,
                email: this.user.email,
              };
            }
            return user;
          });
        } else if (this.users) {
          updateUser = [...this.users, {
            id: uuidv4(),
            name: this.user.name,
            surname: this.user.surname,
            phone: this.user.phone,
            email: this.user.email,
          }];
        } else {
          updateUser = [{
            id: uuidv4(),
            name: this.user.name,
            surname: this.user.surname,
            phone: this.user.phone,
            email: this.user.email,
          }];
        }

        this.setUsers(updateUser);
        this.$router.push({ name: 'home' });
      }
    },

    handleJsonSubmit() {
      if (!this.$v.jsonUser.$invalid) {
        let users = JSON.parse(this.jsonUser);
        users = users.map((user) => ({
          ...user,
          id: uuidv4(),
        }));
        this.setUsers([...this.users, ...users]);
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
