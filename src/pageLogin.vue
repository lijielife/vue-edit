<template>
  <div class="pageLogin">
    <div class="loginFrame">
      <div class="login_top"></div>
      <div class="login_mid">
        <p class="name_user">用户登录</p>
        <form action="" method="get" accept-charset="utf-8">
          <ul>
            <li class="input_child"><input class="name_IN" type="text" name="" placeholder="请输入你的用户名" /></li>
            <li class="input_child"><input class="name_SE" type="text" name="" placeholder="请输入你的密码" /></li>
            <li class="input_child">
              <input class="name_CO" type="text" name="" placeholder="请输入验证码" />
              <img class="name_IMG" src="./assets/images/pageLogin_img.jpg" />
            </li>
            <li class="input_child input_Login" @click="handleClick">登录</li>
          </ul>
          <p class="forget_secet">忘记密码?</p>
          <p class="direct_access">不登录，直接访问</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageLogin',
  methods: {
    handleClick () {
      this.$router.push({
        name: 'PageHome'
      })
    }
  }
}
</script>

<style scoped>
.pageLogin{
  width: 100%;
  height: 100%;
  background: #f0f1f2 url('../src/assets/images/pageLogin_bg.png') no-repeat left center;
  position: relative;
}
.loginFrame{
  position: absolute;
  right: 5%;
  top: 10%;
  width: 30%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px #A0A5A9;
}
.login_top{
  height: 120px;
  background: url('../src/assets/images/pageLogin_letters.png') no-repeat center center;
  box-shadow: 0 1px 10px #A0A5A9;
}
.login_mid{
  padding: 5% 10%;
  padding-bottom: 0;
}
.name_user{
  font-size: 24px;
  color: #333;
  margin-top: 5%;
}
.input_child{
  height: 46px;
  line-height: 46px;
  margin-top: 8%;
  position: relative;
}
.input_child>>>input{
  height: 46px;
  line-height: 46px;
  border: 1px solid #ccc;
  outline: none;
  box-shadow: none;
  padding-left: 45px;
  border-radius: 5px;
  font-size: 18px;
}
.name_IN{
  background: url('../src/assets/images/pageLogin_name.png') no-repeat 10px center;
}
.name_SE{
  background: url('../src/assets/images/pageLogin_secet.png') no-repeat 10px center;
}
.name_CO{
  background: url('../src/assets/images/pageLogin_code.png') no-repeat 10px center;
}
.name_IMG{
  position: absolute;
  right: 10px;
  top: 6px;
  width: 90px;
  height: 34px;
  cursor: pointer;
}
.input_Login{
  background: #3780FC;
  border-radius: 10px;
  font-size: 26px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.forget_secet{
  font-size: 14px;
  color: #3780FC;
  text-align: right;
  margin-top: 5%;
}
.direct_access{
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 10%;
}
@media screen and (width: 1366px) {
  .name_user{
    margin-top: 1%;
  }
  .input_child{
    margin-top: 4%;
  }
  .direct_access{
    margin-top: 4%;
  }
}
</style>
