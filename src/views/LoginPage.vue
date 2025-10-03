<script setup>
import { ref  } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth } from '@/router/index.js'

const Auth = getAuth
const router = useRouter();

const inputID = ref('');
const inputPassword = ref('');

const errorMessages = ref({"id" : '',
                           "password" : ''})

// function login(){
//     errorMessages.value.id = ""
//      errorMessages.value.password = ""

//     if(inputID.value == "LIS01" && inputPassword.value == "1234"){
//         Auth.value = true
//         redirectToBoard()
//     }else if (inputID.value != "LIS01" && inputPassword.value != "1234"){
//          Auth.value = false
//          errorMessages.value.id = "使用者ID錯誤"
//          errorMessages.value.password = "使用者密碼錯誤"
//     }else if(inputID.value != "LIS01"){
//         Auth.value = false
//         errorMessages.value.id = "使用者ID錯誤"
//     }else if (inputPassword.value != "1234"){
//          Auth.value = false
//         errorMessages.value.password = "使用者密碼錯誤"
// }
// }


function login(){
    // 清空錯誤訊息
    errorMessages.value.id = ""
    errorMessages.value.password = ""

    // 直接認證成功
    Auth.value = true
    redirectToBoard()
}

function redirectToBoard() {
  if (Auth.value) {
    router.push('/'); // 將路由導致 'DashBoard'
  }
}

</script>
<template>
<section class="login">
    <div class="login-container">
    <div class="circle"></div>
    <div class="login-title">歡迎登入 數據庫</div>
    <div class="f-title">頁面展示，無須輸入帳號密碼</div>
    <div class="login-input">
        <input type="text" placeholder="ID" v-model="inputID">
    </div>
    <div class="error-message" :style="{ visibility: errorMessages.id == '' ? 'hidden' : 'visible' }">{{errorMessages.id}}</div>
    <div class="login-input">
        <input type="password" placeholder="Password" v-model="inputPassword">
    </div>
    <div class="error-message" :style="{ visibility: errorMessages.password == '' ? 'hidden' : 'visible' }">{{errorMessages.password}}</div>
    <button class="btn"  @click="login">登入</button>
    </div>
</section>

<main class="bk">
    <div class="relative flex flex-col h-[100vh] items-center justify-center transition-bg">
        <div class="circle-mask"></div>
        <div class="absolute inset-0 overflow-hidden">
            <div class="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
    </div>
</main>
</template>


<style scope>

.login{
    z-index: 2;
}
.circle-mask{
    position: absolute;
    width: 1500px;
    height: 1500px;
    border-radius: 1500px;
    background-color:#D2E5F6 ;
    z-index: 1;
    top:20%;
    left:30%;
    transform: translate(-60%, -20%);
    filter: blur(50px);
    opacity: 0.8;
}
.bk{
    background-color: #D2E5F6 !important;
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -1;
    overflow: hidden;

}
@keyframes jumbo {
    from {
        background-position: 50% 50%, 50% 50%;
    }
    to {
        background-position: 350% 50%, 350% 50%;
    }
}

.jumbo {
    --stripes: repeating-linear-gradient(
        100deg,
        #fff 0%,
        #fff 7%,
        transparent 10%,
        transparent 12%,
        #fff 16%
    );
    --stripesDark: repeating-linear-gradient(
        100deg,
        #000 0%,
        #000 7%,
        transparent 10%,
        transparent 12%,
        #000 16%
    );
    --rainbow: repeating-linear-gradient(
        100deg,
        #60a5fa 10%,
        #e879f9 15%,
        #60a5fa 20%,
        #5eead4 25%,
        #60a5fa 30%
    );
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position: 50% 50%, 50% 50%;

    filter: blur(30px) invert(100%);

    mask-image: radial-gradient(ellipse at 100% 0%, rgb(255, 255, 255) 40%, transparent 70%);

    pointer-events: none;
}

.jumbo::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    animation: jumbo 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
}

.dark .jumbo {
    background-image: var(--stripesDark), var(--rainbow);
    filter: blur(10px) opacity(50%) saturate(200%);
}
.dark .jumbo::after {
    background-image: var(--stripesDark), var(--rainbow);
}

</style>