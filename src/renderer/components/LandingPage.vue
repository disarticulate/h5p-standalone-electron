<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu 
          theme="dark" 
            class="el-menu-demo" 
            mode="horizontal">
            <el-menu-item index="1-1">
              <el-button 
                type="primary"
                icon="menu"
                @click="toggleSideBar()">
                  Menu
              </el-button>
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-input
                v-model="filePath"
                size="small"
                placeholder="H5P files Path">
              </el-input>
              <el-button 
                type="primary"
                size="small"
                icon="search"
                @click="selectFolderPath()">
                  Locate Folder
              </el-button>
            </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-menu default-active="1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse">
            <el-menu-item index="1"
              @click="$refs.viewer.loadH5P()">
              <span slot="title"> Play H5P </span>
              <i class="el-icon-caret-right"></i>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-more">
                </i>
                <span slot="title">
                  Available H5P
                </span>
              </template>
              <el-menu-item-group title="Folders">
                <el-menu-item 
                  index="2-2"
                  v-for="(path, key) in filePaths"
                  :key="key"
                  @click="$refs.viewer.loadH5PPath(path)">
                  {{path}}
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Archives">
                <el-menu-item
                  index="2-1" 
                  v-for="(file, key) in files"
                  :key="key"
                  @click="$refs.viewer.loadH5PFile(file)">
                    {{file}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col 
        :span="20">
        <h5p
          ref="viewer">  
        </h5p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import h5p from './H5P-viewer'

  export default {
    components: {
      h5p
    },
    data () {
      return {
        filePath: '',
        files: [],
        filePaths: [],
        isCollapse: false
      }
    },
    mounted () {
      var vm = this
      vm.$root.ipc.send('hp5-folder', 'mounted')
      vm.$root.ipc.on('hp5-folder', (event, arg) => {
        console.log('hp5-folder', arg)
        vm.filePath = arg
      })
      vm.$root.ipc.on('hp5-folder-file', (event, arg) => {
        console.log('hp5-folder-file', arg)
        vm.files.push(arg)
      })
      vm.$root.ipc.on('hp5-folder-path', (event, arg) => {
        console.log('hp5-folder-path', arg)
        vm.filePaths.push(arg)
      })
    },
    methods: {
      extractFile () {

      },
      selectFolderPath () {
        var vm = this
        console.log('hp5-folder', 'select')
        vm.$root.ipc.send('hp5-folder', 'select')
      },
      toggleSideBar () {
        this.isCollapse = !this.isCollapse
      },
      handleOpen (key, keyPath) {
        // when a menu is opeen
      },
      handleClose (key, keyPath) {
        // when a menu is closed
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
