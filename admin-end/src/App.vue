<template>
  <div id="app">
      <div id="wrapper">

    <!-- Sidebar -->
      <!-- <app-sidebar v-if="($route.path !==  '/login')"></app-sidebar> -->
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->

        <!--  Header Goes Here -->
        <app-header v-if="($route.path !==  '/login')"></app-header>
     <router-view style="margin-Top: 20px;"></router-view>
     <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; MooreTest 2020</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  </div>
  </div>
</template>

<script>
  global.jQuery = require('jquery');
  require("./axois.js");
  import Header from './components/Header.vue'; 
  // import Sidebar from '././components/Sidebar.vue'; 
export default {
  name: 'App',
  data () {
      return {
      }
  },
 
  components: {
      'app-header' : Header,
      // 'app-sidebar' : Sidebar,

  }
}
</script>