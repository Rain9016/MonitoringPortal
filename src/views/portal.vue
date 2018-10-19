<template>
  <div class="components-container">
    <div class="header" >
      <slot>
        <span class="Logo">Monitoring Portal</span>
        <el-button class="filter-item" type="danger" @click="Logout" >Logout</el-button>
        <el-button class="filter-item" type="primary" @click="addPatient">Subscribe Patient</el-button>
        <el-input placeholder="Search" v-model="listQuery" style="width: 200px; margin-left:20px" clearable class="filter-item" />

      </slot>
    </div>
    <div class="app-breadcrumb">
      <div class="board">
          <PatientList v-for="(patient, index) in list" :key="index" :list="patient" :options="options" class="patientlist"/>
      </div>
    </div>

    <el-dialog title="Reset Password" :visible.sync="viewPatientListDialogVisible">
      <el-form ref="dataForm" label-position="left"  style="width: auto;">
          <el-checkbox v-for="(patient, index) in patientlist" v-model="patientlist[index]" :key="index">{{index}}</el-checkbox>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewPatientListDialogVisible = false">Close</el-button>
        <el-button type="primary" @click="subscription">Submit</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PatientList from '@/components/PatientList'
import config from '../config/vueConfig'
import io from 'socket.io-client'

export default {
  name: 'Portal',
  components: {
    PatientList
  },
  data () {
    return {
      listQuery: '',
      data: [],
      socket: null,
      patientlist: {},
      subscribepatientlist: [],
      viewPatientListDialogVisible: false,
      options: {
        group: 'mission'
      }
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    addPatient () {
      this.viewPatientListDialogVisible = true
      this.getPatientList()
    },
    // request patient list
    getPatientList: function () {
      this.socket.emit('patientlist', {username: this.username}, this.processPatientList)
    },
    // handler for patient list
    processPatientList: function (data) {
      this.patientlist = data
    },
    // handler for incomming data
    processNewData: function (data) {
      if (data.location === 'unknown area') {
        this.$toaster.error('Patient ' + data.patientid + ' ' + data.activity + ' ' + data.location)
      } else {
        this.$toaster.ok('Patient ' + data.patientid + ' ' + data.activity + ' ' + data.location)
      }
      if (this.data.length > 10000) this.data = []
      this.data = this.data.concat(data)
    },
    setupPatientlist: function () {
      this.socket.emit('patientlist', {username: this.username}, this.initailSubscription)
    },
    initailSubscription: function (data) {
      for (let index in data) {
        if (data[index] === true) {
          this.socket.emit('subscribe', {username: this.username, patientid: index})
        } else {
          this.socket.emit('unsubscribe', {username: this.username, patientid: index})
        }
      }
      this.data = []
    },
    // subscribe/unsubscribe patient data
    subscription: function () {
      for (let index in this.patientlist) {
        if (this.patientlist[index] === true) {
          this.socket.emit('subscribe', {username: this.username, patientid: index})
        } else {
          this.socket.emit('unsubscribe', {username: this.username, patientid: index})
        }
      }
      this.data = []
      this.viewPatientListDialogVisible = false
    },
    Logout: function () {
      this.logout()
      this.$router.push('/login')
    }
  },
  created () {
    // initialise socket
    const Token = sessionStorage.getItem('token')
    const userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
    this.username = userInfo.username
    this.socket = io.connect(config.serverUrl, {query: {token: Token, username: this.username}})
    this.socket.on('connect', () => {
      console.log('connect')
    })
    this.socket.on('disconnect', () => {
      console.log('disconnect')
    })
  },
  mounted () {
    // listen to incomming data
    this.socket.on('message', this.processNewData)
    this.setupPatientlist()
  },
  computed: {
    list: function () {
      let jsonObject = {}
      // Filter by search
      let temp = this.data.filter(item => {
        if (this.listQuery && item.patientid.search(this.listQuery) < 0) {
          return false
        }
        return true
      })
      // sort by patientid by time
      temp.sort(function (a, b) {
        var nameA = a.patientid.toUpperCase()
        var nameB = b.patientid.toUpperCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        var timeA = a.time
        var timeB = b.time
        if (timeA > timeB) return -1
        return 1
      })
      // remove the oldest data if more than 9
      for (let index in temp) {
        if (jsonObject[temp[index].patientid] === undefined) jsonObject[temp[index].patientid] = []
        if (jsonObject[temp[index].patientid].length < 9) {
          jsonObject[temp[index].patientid].push(temp[index])
        }
      }
      return jsonObject
    }
  },
  // disconnect socket before leaving this page
  beforeDestroy () {
    this.socket.close()
  }
}
</script>
<style lang="scss">
.el-checkbox {
  margin-right: 10px;
}
.el-checkbox+.el-checkbox {
  margin-left: 0px;
}
.app-breadcrumb {
  margin-top: 60px;
  border-bottom: 1px solid #e6e6e6;
}
.header {
  background-color: #2e3f4f;
  color: white;
  height: 60px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  .Logo {
    font-size: 30px;
    margin-left: 20px;
    line-height: 55px;
    font-weight: bold;
  }
  .filter-item {
    margin-right: 20px;
    float: right;
    margin-top: 10px;
  }
}
.page-main-content {
  padding: 20px;
}
.board {
  width: auto;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: auto;
}
.board-column {
  &.patientlist {
    margin-left: 5px;
    .board-column-header {
      background: rgba(63,81,181,1);
    }
    // &.warning {
    //   .board-column-header {
    //     background: #f9944a;
    //   }
    // }
    // &.danger {
    //   .board-column-header {
    //     background: #2ac06d;
    //   }
    // }
  }
}

</style>
