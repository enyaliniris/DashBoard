<template>
  <div class="Refresh Btn">
    <div class="logout-container" @click="logout">
      <span class="logout-font">登出</span>
      <div class="logoutIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="27"
          viewBox="0 0 28 27"
          fill="none"
        >
          <g filter="url(#filter0_d_219_57)">
            <path
              d="M16 4H10C7.79086 4 6 5.79086 6 8V15C6 17.2091 7.79086 19 10 19H16"
              stroke="#01859A"
              stroke-width="3"
              stroke-linecap="round"
            />
          </g>
          <g filter="url(#filter1_d_219_57)">
            <path
              d="M14.75 11.5L22.25 11.5"
              stroke="#01859A"
              stroke-width="3"
              stroke-linecap="round"
            />
          </g>
          <path
            d="M20.375 7.75L21.624 9.37366C22.73 10.8115 22.73 12.8135 21.624 14.2513L20.375 15.875"
            stroke="#01859A"
            stroke-width="3"
            stroke-linecap="round"
          />
          <defs>
            <filter
              id="filter0_d_219_57"
              x="0.7"
              y="0.7"
              width="20.6"
              height="25.6"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="1.9" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.327656 0 0 0 0 0.73929 0 0 0 0 0.970833 0 0 0 0.7 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_219_57" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_219_57"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_219_57"
              x="9.45"
              y="8.2"
              width="18.1"
              height="10.6"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="1.9" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.327656 0 0 0 0 0.73929 0 0 0 0 0.970833 0 0 0 0.7 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_219_57" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_219_57"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    <div class="btn-container" @click="refresh">
      <div class="refeshicon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M15.8892 5.3987C17.4792 7.42893 18.0072 10.2136 17.0409 12.8071C15.563 16.7739 11.1492 18.7915 7.18247 17.3136C3.2157 15.8357 1.19808 11.4219 2.676 7.45513C3.64228 4.86158 5.8636 3.10125 8.39445 2.60635"
            stroke="#D2E5F6"
            stroke-width="3.5"
            stroke-linecap="round"
          />
          <path
            d="M13.9347 7.53682L14.3003 4.29154C14.3806 3.57861 15.1634 3.17971 15.7874 3.53369L18.9373 5.32043"
            stroke="#D2E5F6"
            stroke-width="3.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div class="btn-bk">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="50"
          viewBox="0 0 44 50"
          fill="none"
        >
          <g filter="url(#filter0_ddi_219_48)">
            <circle cx="23" cy="25" r="17" fill="#01859A" />
          </g>
          <defs>
            <filter
              id="filter0_ddi_219_48"
              x="0"
              y="0"
              width="44"
              height="50"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2" dy="-4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.9375 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_219_48" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_219_48"
                result="effect2_dropShadow_219_48"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_219_48"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="0.95" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.787587 0 0 0 0 0.857187 0 0 0 0 0.879167 0 0 0 0.43 0"
              />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_219_48" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth } from '@/router/index.js'
const Auth = getAuth

import { useRouter } from 'vue-router'
const router = useRouter()


function logout() {
  Auth.value = false
  router.push('/login')
}

import { defineEmits } from 'vue';
const emits = defineEmits(['Event']);
function refresh(){
  emits('Event')
}
</script>

<style scope>
.logout-container {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  padding: 3px;
  border-radius: 15px;
  background-color: #e4ebf5;
  box-shadow:
    4px 4px 10.7px 3px rgba(146, 213, 235, 0.43),
    -2px -4px 4px 0px #efffff;
  cursor: pointer;
}

.logout-container:hover {
  background-color: #e3f2ff;
  box-shadow:
    4px 4px 8px 3px #efffff,
    -2px -4px 4px 0px rgba(146, 213, 235, 0.43);
  border-radius: 30px;
  transition:
    box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out; /* 添加阴影过渡效果 */
}

.logout-container:hover .logout-font,
.logoutIcon {
  margin-top: 4px;
  margin-left: 4px;
  transition:
    margin-top 0.3s ease-in-out,
    margin-left 0.3s ease-in-out;
}

.logout-font {
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--lake-blue);
  margin-top: 2px;
  margin-left: 2px;
}
.btn-container {
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn-container:hover .refeshicon {
  transform: rotate(360deg);
}

.refeshicon {
  z-index: 1;
  /*position: absolute;
   
    right: 25px;
    transition: transform 0.5s ease;*/
}
.btn-bk {
  position: absolute;
  z-index: 0;
}
.Btn {
  width: 100%;
  border-radius: 15px;
  /* background-color: #E4EBF5; */
  /* box-shadow: 4px 4px 10.7px 3px rgba(146, 213, 235, 0.43), -2px -4px 4px 0px #EFFFFF; */
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
