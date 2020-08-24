</<template>
    <div class="container-fluid">
        <!-- Content Row -->
        <div class="row">
    
    
    
            <!-- Area Chart -->
    
            <div class="col-xl-6 col-lg-6">
    
                <div class="card shadow mb-4">
    
                    <!-- Card Header - Dropdown -->
    
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
    
                        <h6 class="m-0 font-weight-bold text-primary">Add Task</h6>
    
                        <div class="dropdown no-arrow">    
                        </div>
    
                    </div>
    
                    <!-- Card Body -->
    
                    <div class="card-body">
    
                        <div>
    
                            <form @submit.prevent="submitTask" class="form-group">
    
                                <div class="form-group">
                                    <label for="select-type">Task Title</label>
                                    <input v-model="task.task_title" placeholder="Task Title." class="form-control" type="text" required /> 
                                </div>

                                <div class="form-group">
                                    <label for="category_details">Task Details</label>
                                    <textarea v-model="task.task_details" placeholder="Task Details" class="form-control" type="text" required>
                                    </textarea>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control btn btn-primary">
                                         Save Task
                                    </button>
                                </div>

                            </form>
    
                        </div>
    
                    </div>
    
                </div>
    
            </div>
    
    
    
            <!-- Pie Chart -->
    
            <div class="col-xl-6 col-lg-6">
    
                <div class="card shadow mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Recent Tasks</h6>
                        <div class="dropdown no-arrow">
                        </div>
                    </div>
                    <!-- Card Body -->
                    <div class="card-body d-block scroll-wrapper" style="overflow:auto;height: 450px">
                        <div  v-for="(info,$index) in recentTasks" :key="$index">
                            <h4 class="small font-weight-bold">{{ info.title }} <span class="float-right">100</span></h4>
        
                            <div class="progress mb-4">
                                <div :class="['progress-bar', taskStyles[Math.floor(Math.random() * taskStyles.length)]]"  role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        <div> 
                            <router-link to="allTasks">View Task</router-link>
                        </div>  
                    </div>
    
                </div>
    
            </div>
    
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      task: {
        task_title: "",
        task_details: ""
      },
      recentTasks:[],
      loader: null,
      taskStyles: ["bg-warning", "bg-info", "bg-success", "bg-danger"]
    };
  },
  methods: {

    submitTask(e) {
      this.displayLoader();
      
      axios
        .post(
          process.env.VUE_APP_ROOT_API +
            "createTask",
          this.task
        )
        .then(() => {
          //console.log(response.data);
          e.target.reset();
          this.$swal({
            icon: "success",
            title: "Task Created Successfully",
            text: "🙂"
          });
          var newTask = {"title" : this.task.task_title};
          this.recentTasks.push(newTask);

          this.task.task_title = "";
          this.task.task_details = "";
          this.loader.hide();
        })
        .catch(error => {
          console.log("Error", error);
          const validationerror = JSON.parse(
            JSON.stringify(error.response.data)
          );
          this.loader.hide();
          if (error.response.status == 422) {
            const titleError = validationerror.errors.title_error;

            if (titleError != null) {
              this.$swal({
                icon: "error",
                title: "Unkonwn Error Occured",
                text: "Please Retry"
              });
            }
          }
        });
    },
    displayLoader() {
      this.loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: false,
        onCancel: this.onCancel,
        color: "#4e73df",
        loader: "bars",
        width: 100,
        height: 100,
        backgroundColor: "#e1e1e1",
        opacity: 0.6,
        zIndex: 999
      });
    },
    fetchRecentTask() {
      this.displayLoader();
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            "fetchRecentTask"
        )
        .then(response => {
          const myresponse = JSON.parse(JSON.stringify(response.data.response));
          this.recentTasks = myresponse.data;
          this.loader.hide();
        })
        .catch(() => {
          this.loader.hide();
          this.$swal({
            icon: "error",
            title: "Error Fetching Recent Tasks",
            text: "🤷‍♂️"
          });
        });
    }
  },
  mounted() {
    this.fetchRecentTask();
  }
};
</script>