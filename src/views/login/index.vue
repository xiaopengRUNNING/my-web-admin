<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
// import { ref, watch } from 'vue';
import { useUserState } from '@/store';

const router = useRouter();
const userStore = useUserState();
const signUp = ref(false);
const loading = ref(false);
const loginParam = ref({ username: '', password: '' });
const errorInfo = ref({ username: false, password: false });

watch(
  loginParam,
  (newValue) => {
    if (errorInfo.value.username || errorInfo.value.password) {
      errorInfo.value.username = !newValue.username;
      errorInfo.value.password = !newValue.password;
    }
  },
  { deep: true },
);

const onSignIn = () => {
  if (!loginParam.value.username || !loginParam.value.password) {
    errorInfo.value.username = !loginParam.value.username;
    errorInfo.value.password = !loginParam.value.password;
    return;
  }
  loading.value = true;
  userStore
    .userLogin(loginParam.value)
    .then(() => {
      router.push('/home');
      Message.success('欢迎回来！');
    })
    .finally(() => {
      loading.value = false;
    });
};
const onSignUp = () => {
  Message.info('暂不提供自行注册功能，敬请期待！');
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-zinc-200 to-indigo-200 flex justify-center items-center"
  >
    <div :class="{ container: true, active: signUp }" id="container">
      <div class="form-container sign-up">
        <form>
          <h1>创建账号</h1>
          <span>填写资料来注册</span>
          <input type="text" placeholder="姓名" />
          <input type="text" placeholder="账号" />
          <input type="password" placeholder="密码" />
          <a-button type="primary" size="large" @click="onSignUp">
            注 册
          </a-button>
        </form>
      </div>

      <div class="form-container sign-in">
        <form>
          <h1>登 录</h1>
          <span>使用你的账号和密码</span>
          <input
            :class="{ error: errorInfo.username }"
            type="text"
            placeholder="账号"
            v-model="loginParam.username"
          />
          <input
            :class="{ error: errorInfo.password }"
            type="password"
            placeholder="密码"
            v-model="loginParam.password"
          />
          <a href="#">忘记密码?</a>
          <a-button
            type="primary"
            size="large"
            @click="onSignIn"
            :loading="loading"
          >
            登 录
          </a-button>
        </form>
      </div>

      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>输入账号信息以使用所有网站功能</p>
            <button class="line" id="login" @click="signUp = !signUp">
              去登录
            </button>
          </div>

          <div class="toggle-panel toggle-right">
            <h1>Hello Friend!</h1>
            <p>使用个人信息来注册以此来使用网站的所有功能</p>
            <button
              class="line"
              id="register"
              @click="signUp = !signUp"
              :loading="loading"
            >
              去注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
h1 {
  font-size: 2rem;
}
.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }
  span {
    font-size: 12px;
  }
  a {
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
  }
  button {
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;

    &.line {
      background-color: transparent;
      border: 1px solid;
    }
  }
  form {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
  }
  input {
    background-color: #eee;
    border: 1px solid transparent;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;

    &.error {
      border: 1px solid #ff0000;
    }
  }
  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }
  .sign-up {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  &.active {
    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: move 0.6s;
    }
  }
  .sign-in {
    left: 0;
    width: 50%;
    z-index: 2;
  }
  &.active {
    .sign-in {
      transform: translateX(100%);
    }
  }
  @keyframes move {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }
    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
  .toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
  }
  &.active {
    .toggle-container {
      transform: translateX(-100%);
      border-radius: 0 150px 100px 0;
    }
  }
  .toggle {
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #94bfff, #165dff);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }
  &.active {
    .toggle {
      transform: translateX(50%);
    }
  }
  .toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }
  .toggle-left {
    transform: translateX(-200%);
  }
  &.active {
    .toggle-left {
      transform: translateX(0);
    }
  }
  .toggle-right {
    right: 0;
    transform: translateX(0);
  }

  &.active {
    .toggle-right {
      transform: translateX(200%);
    }
  }
}
</style>
