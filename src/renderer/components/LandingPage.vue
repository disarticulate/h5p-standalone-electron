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
      <el-col 
        :span="fileViewWidth">
        <div class="grid-content bg-purple-dark">
          <el-menu default-active="1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse">
            <el-menu-item index="1"
              @click="$refs.viewer.playH5P()">
              <icon 
                :name="$refs.viewer.playing ? 'pause-circle' : 'play-circle-o'" 
                scale="1" 
                class="el-icon-more" > 
              </icon>
              <template slot="title"> 
                Play H5P
              </template>
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
                  class="folders" 
                  index="2-2"
                  v-for="(path, key) in filePaths"
                  :key="key"
                  @click="$refs.viewer.loadH5PPath(path)">
                  {{path}}
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Archives">
                <el-menu-item
                  class="folders"
                  index="2-1" 
                  v-for="(file, key) in files"
                  :key="key">
                    <el-button 
                      type="primary" 
                      size="mini">
                      <icon label="Expand Archive">
                        <icon name="expand" scale="0.6" class="alert" ></icon>
                        <icon name="file-archive-o" scale="1"></icon>
                      </icon>
                   </el-button>
                    {{file}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col 
        :span="viewerWidth">
        <h5p
          ref="viewer">  
        </h5p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import h5p from './H5P-viewer'
  import 'vue-awesome/icons/flag'
  export default {
    components: {
      h5p
    },
    data () {
      return {
        filePath: '',
        files: [],
        filePaths: [],
        isCollapse: false,
        fileViewWidth: 12,
        viewerWidth: 12
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
      vm.$root.ipc.on('hp5-folder-clear', (event, arg) => {
        console.log('hp5-folder-clear', arg)
        vm.filePaths.length = 0
        vm.files.length = 0
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
        if (this.isCollapse) {
          this.fileViewWidth = 2
          this.viewerWidth = 22
        } else {
          this.fileViewWidth = 12
          this.viewerWidth = 12
        }
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

<style scoped>
.archives {
  overflow-wrap: break-word;
}
.folders {
  overflow-wrap: break-word;
}
</style>
