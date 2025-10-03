<script setup>

import { getNavOption } from '@/router/index.js'
import ErrorModal from '@/components/error-modal.vue'
const navOption = getNavOption

</script>

<template>
  <header>
    <!-- <nav>
        <div class="nav-bk-top">
          <RouterLink to="/login">
          <div class="nav-icon">
              <img src="@/assets/img/logo.png" alt="Dashboard Icon">
          </div>
         </RouterLink>
      </div>
      <div class="nav-mid-container">
         <div class="nav-bk-mid" :class="{'unactive': navOption === 2}">
         </div>
        <div class="nav-list-container">
          <RouterLink to="/">
          <div class="nav-list" :class="{'nav-list-active': navOption === 1}">
            <img src="@/assets/img/operater.png" alt="Dashboard Icon">
            <span>數據庫</span>
          </div>
          </RouterLink>
          <div class="nav-list">
            <img src="@/assets/img/operater.png" alt="Setting Icon">
            <span>開發中</span>
          </div>
          <div class="nav-list">
            <img src="@/assets/img/operater.png" alt="Setting Icon">
            <span>開發中</span>
          </div>
      </div>
      </div>
      <div class="nav-bk-bottom"></div>
    </nav> -->
  </header>
  <RouterView />
  <ErrorModal/>
</template>
