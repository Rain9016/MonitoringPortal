<template>
<div id="regis-page">
  <div class="regis-main">
    <div class="regis-title">
      MonitoringPortal
    </div>
    <div class="regis-wrap">
      <el-form :rules="rules" :span="10" ref="regis" :model="regis" prop="regs">
        <div>
          <el-form-item prop="username">
            <el-input placeholder="Username" v-model="regis.username"></el-input>
          </el-form-item>
          <br />
          <el-form-item prop="password" >
            <el-input type="password" placeholder="Password" v-model="regis.password"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="submitForm('regis')">Register</el-button>
          </el-form-item>
          <el-form-item>
            Already registered？
            <router-link to="/login" class="btn btn-link">Login</router-link>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Regis',
  data () {
    return {
      regis: {
        username: '',
        password: ''
      },
      submitted: false,
      rules: {
        password: [
          { validator: this.validatePassword, trigger: 'blur' }
        ],
        username: [
          { validator: this.validateUsername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['register']),
    submitForm: function (ruleForm2) {
      this.$refs.regis.validate((valid) => {
        if (valid) {
          let username = this.regis.username
          let password = this.regis.password
          this.register({ username, password }).then(
            result => {
              this.$toaster.ok(result)
              this.$router.push('/login')
            },
            error => {
              this.$toaster.error(error)
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validatePassword: function (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input your password!'))
      } else {
        callback()
      }
    },
    validateEmail: function (rule, value, callback) {
      if (!this.$utils.isAccount(value)) {
        callback(new Error('Please input a valid email address'))
      } else {
        callback()
      }
    }
  },
  computed: {
    ...mapState('userstate', ['status'])
  },
  mounted () {}
}

</script>

<style lang="scss">
#regis-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2e3f4f;
  background-position: center center;
  .regis-main {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 340px;
    overflow: hidden;
    .regis-title {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      padding: 20px;
      text-align: center;
      opacity: 0.7;
    }
    .regis-wrap{
      border-radius: 5px;
      background: #fff;
      .el-form {
        padding: 60px 40px 20px 40px;
      }
      .el-form-item__label {
        text-align: left;
      }
      .el-form-item {
        margin-bottom: 10px;
        .el-button--primary {
          width: 100%;
        }
      }
    }
  }
  .regis-info {
    color: #fff;
    opacity: 0.7;
    line-height: 20px;
    position: absolute;
    left: 20px;
    top: 20px;
  }
}

</style>
