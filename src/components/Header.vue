<template>
  <v-card>
    <v-bottom-navigation
      grow="true"
      horizontal="true"
      :value="activeBtn"
      color="blue lighten-1"
    >
      <v-btn
        :to="{name: 'home'}"
        class=""
        exact>
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        to="edit"
        exact>
        <span>Add user</span>
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
export default {
  name: 'main-header',
};
</script>
