<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <alert type="success">
          <strong>Success!</strong> You have added a new account.
        </alert>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-link to="/accounts">
          <button class="btn btn-primary">View Accounts</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
