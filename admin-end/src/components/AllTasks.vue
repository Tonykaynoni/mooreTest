<template>
  <div class="container-fluid">
    <!-- Content Row -->

    <div class="row">
      <!-- Pie Chart -->

      <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->

          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">All Tasks</h6>
          </div>

          <!-- Card Body -->

          <div class="card-body">
            <table class="table table-striped table-responsive-md btn-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Details</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(info,$index) in allTasks" :key="$index" :value="info.id">
                  <th scope="row">{{ $index + 1 }}</th>
                  <td>{{ info.title }}</td>
                  <td>{{ info.details }}</td>
                  <td>{{ info.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                  <td>
                    <button class="btn btn-danger" @click="deleteTask(info.id,$index)">Delete</button>
                    <button class="btn btn-primary" @click="showModal(info,$index)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="modalData != null"
      name="EditModal"
      :adaptive="true"
      height="auto"
      :scrollable="true"
    >
      <div class="card">
        <div slot="top-right">
          <button class="btn" @click="closeModal">❌</button>
        </div>
        <div class="card-title container">
          <h3>{{ modalData.task_title }}</h3>
        </div>
        <div class="card-body">
          <div class="row">

            <div class="col-12 col-xl-12" style="margin-bottom:10px;">
              <form @submit.prevent="editTask" calss="form-group">
                <div class="form-group">
                  <label for="select-type">Task Title</label>
                  <input
                    v-model="editDetails.task_title"
                    placeholder="Category Name."
                    class="form-control"
                    type="text"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="category_details">Task Details</label>
                  <textarea
                    v-model="editDetails.task_details"
                    placeholder="Category Details"
                    class="form-control"
                    type="text"
                    required
                  ></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary">Edit Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loader: null,
      allTasks: [],
      modalData: null,
      editDetails: {
        currentIndex : "",
        task_id: "",
        task_title: "",
        task_details: "",
      }
    };
  },
  filters: {
    fallback: function(name) {
      return name ? name : 'there'
    }
  },
  methods: {

    editTask() {
      this.displayLoader();
      axios
        .post(
          process.env.VUE_APP_ROOT_API +
            "editTask",
            this.editDetails
        )
        .then(res => {
          this.allTasks = res.data.response;
          this.$swal({
            icon: "success",
            title: "Edited Successfully",
            text: "👌"
          });

          this.loader.hide();
        })
        .catch(error => {
          const validationerror = JSON.parse(
            JSON.stringify(error.response.data)
          );
          this.loader.hide();
          if (error.response.status == 422) {
            const task_title_error = validationerror.errors.task_title;
            if (task_title_error != null) {
              this.$swal({
                icon: "error",
                title: "Use a unique task title🤦‍♂️",
                text: task_title_error
              });
            }
          }
           if (error.response.data.error != null) {
              this.$swal({
                icon: "error",
                title: "Update Failed",
                text: error.response.data.error
              });
            }
        });
    },
    showModal(info,index) {
      this.editDetails = {
        currentIndex : index,
        task_id: info.id,
        task_title: info.title,
        task_details: info.details
      };
      this.modalData = info;
      this.$modal.show("EditModal");
    },
    closeModal() {
      this.$modal.hide("EditModal");
    },
    deleteTask(taskId, index) {
      this.$swal({
        icon: "warning",
        title: "Are you sure?",
        text:
          "You won't be able to revert this😲",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
      }).then(result => {
        if (result.value) {
          this.displayLoader();
          axios
            .post(
              process.env.VUE_APP_ROOT_API +
                "deleteTask",
              { taskId: taskId }
            )
            .then(() => {
              this.$swal({
                icon: "success",
                title: "Task Deleted Successfully",
                text: "😎"
              });
              this.allTasks.splice(index, 1);
              this.loader.hide();
            })
            .catch(() => {
              this.loader.hide();
              this.$swal({
                icon: "error",
                title: "Error deleting Task",
                text: "🤷‍♂️"
              });
            });
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
    fetchAllTasks() {
      this.displayLoader();
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            "fetchAllTask"
        )
        .then(response => {
          const myresponse = JSON.parse(JSON.stringify(response.data.response));
          this.allTasks = myresponse;
          this.loader.hide();
        })
        .catch(() => {
          this.loader.hide();
          this.$swal({
            icon: "error",
            title: "Session TimeOut",
            text: "🤷‍♂️"
          });
        });
    }
  },
  mounted() {
    this.fetchAllTasks();
  }
};
</script>