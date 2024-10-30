<script setup>
import { axiosInstance } from '@/api/axiosInstance';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue';

const route = useRoute()
const blogId = route.params.blogId

const blog = ref();
const comments = ref();



const fetchBlog = async () => {
    try {
        const resp = await axiosInstance.get(`/blogs/${blogId}`)
        console.log(resp)
        blog.value = resp.data.data.blog
        comments.value = resp.data.data.comments
    } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
        
    }
}

onBeforeMount(()=>{
    fetchBlog()
})

</script>

<template>
  {{ $route.params.blogId }}
  <div class="container">
    <h1>{{ blog.title  }}</h1>

    <!-- @if ($blog->user->id == auth()->user()->id) -->

    <!-- <modal heading="Edit Your Blog" id="editBlog"> -->
        <Modal title="Edit Blog" variant="primary" btnName="Edit" stateName="showLoginModal">
        <form method="post" id="update-blog">

            <div class="mb-2">
                <label for="title" class="form-label">Title</label>

                <input
                class="form-control"
                id="title"
                name="title"
                label="Title"
                v-model="blog.title"
                required
                ></input>
            </div>

            <div class="mb-2">
                <label for="content" class="form-label">Title</label>

                <textarea id="content" name="content" label="Content" required v-model="blog.content" class="form-control" style="height:300px">
                    
                </textarea>
            </div>
          
            
        </form>
        <footer> 
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" class="btn btn-danger" form="delete-blog-form">
          Delete
        </button>

        <button type="submit" class="btn btn-primary" form="update-blog">
          Update changes
        </button>     -->
        </footer>


        </Modal>

      <!-- <div class="modal-footer">
       
      </div> -->
    <!-- </modal> -->

    <!--prev update garda keu validation err xa vane popup kholne -->
    <!-- @if ($errors->has('title') || $errors->has('content') || $errors->has('image')) -->

    <!-- @endif -->
    <!-- @endif -->

    <div>Published: {{ blog.created_at }}</div>

    <div class="container">
      <div class="row">
        <div class="col-auto">
          <img
            src=""
            alt="blog-title"
            class="img-fluid"
            style="max-width: 200px"
          />
        </div>
        <div class="col">
          <p>{{ blog.content }}</p>
        </div>
      </div>
    </div>

    <h2 class="underline bold">Comments</h2>
  </div>
</template>
