<template>
<div id="login-page">
  <div class="login-main">
    <div class="login-title">
      MonitoringPortal
    </div>
    <div class="login-wrap">
      <el-form :span="10" >
        <div>
          <el-form-item prop="username">
            <el-input placeholder="Username" v-model="username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="Password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
          </el-form-item>
          <el-form-item>
            Do not have an account?
            <router-link to="/register" class="btn btn-link">Register</router-link><br/>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      submitted: false,
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    submitForm: function (data) {
      if (!this.$utils.isString(this.password)) {
        this.$toaster.error('Pleas enter your password')
        return
      }
      this.submitted = true

      let username = this.username
      let password = this.password

      this.login({ username, password }).then(
        result => {
          this.$toaster.ok(result)
          this.$router.push('/')
        },
        error => {
          this.$toaster.error(error)
        }
      )
    }
  }
}
</script>
<style  lang="scss">
#login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2e3f4f;
  background-position: center center;
  .login-main {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 340px;
    overflow: hidden;
    .login-title {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      padding: 20px;
      text-align: center;
      opacity: 0.7;
    }
    .login-wrap {
      border-radius: 5px;
      background: #fff;
      .el-form {
        padding: 60px 40px 20px 40px;
      }
      .el-form-item {
        margin-bottom: 10px;
        .el-button--primary {
          width: 100%;
        }
      }
    }
  }
  .login-info {
    color: #fff;
    opacity: 0.7;
    line-height: 20px;
    position: absolute;
    left: 20px;
    top: 20px;
  }

}

</style>
