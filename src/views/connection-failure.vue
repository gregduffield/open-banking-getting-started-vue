<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <alert type="danger">
          <strong>Failed!</strong> Something went wrong your account has not
          been linked.
        </alert>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-link to="/accounts">
          <button class="btn btn-primary">Back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
