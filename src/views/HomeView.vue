<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="welcome-container">
      <div class="center-group">
        <div class="title">
          <span class="tip">[内测版]</span>
          <span>救救家人</span>
        </div>
        <div class="menu">
          <button type="button" class="nes-btn">新的开始</button>
          <button type="button" class="nes-btn">不忘初心</button>
          <button type="button" class="nes-btn">我的成就</button>
        </div>
        <!-- <div class="nes-field">
        <label for="name_field">Your name</label>
        <input type="text" id="name_field" class="nes-input">
      </div>

      <button type="button" class="nes-btn is-primary">开始游戏</button> -->
      </div>
    </div>
  </div>
</template>

<style lang="less">
.welcome-container {
  width: 100%;
  height: 100%;
  // background: linear-gradient(#000, #333);
  // background: #000;
  font-family: 'zpix';
  justify-content: center;
  align-items: center;
  display: flex;
  background: linear-gradient(135deg, rgb(255, 83, 83), rgb(0, 94, 255), rgb(3, 255, 108));
  background-size: 400%;
  animation: background-animate 10s linear infinite alternate-reverse;
}

.title {
  padding-left: 15px;
  
  animation: title-animate 5s linear infinite alternate-reverse;
}

.title span {
  display: block;
}

.title span:last-child {
  text-align: center;
  color: #ffe054;
  font-size: 140px;
  font-weight: bold;
  text-shadow: 6px 6px #666;
  letter-spacing: 15px;
}

.title .tip {
  position: relative;
  bottom: -35px;
  color: #fff;
  font-size: 24px;
}

.menu {
  border-top: 7px #fff dashed;
  margin-top: 30px;
  padding-top: 60px;
  // font-size: 30px;
}

.menu button {
  width: 300px;
  margin: 0 auto 30px auto;
  display: block;
}

@keyframes title-animate {
  from {
    transform: translateY(0);
    // transform-origin: center 500px;
    // transform: rotate(0deg);
  }
  to {
    transform: translateY(30px);
    // transform-origin: center 500px;
    // transform: rotate(-360deg);
  }
}

@keyframes background-animate {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}

@media screen and (max-width: 800px) {
  .title .tip {
    font-size: 20px;
    bottom: -25px;
  }
  .title span:last-child {
    font-size: 100px;
  }
}

@media screen and (max-width: 520px) {
  .title .tip {
    font-size: 18px;
    bottom: -20px;
  }
  .title span:last-child {
    font-size: 80px;
  }
}

@media screen and (max-width: 440px) {
  .title .tip {
    font-size: 16px;
    bottom: -15px;
  }
  .menu {
    border-top-width: 4px;
  }
  .title span:last-child {
    font-size: 70px;
  }
}
</style>