 <template>
 
  <main class="flex h-[calc(100vh-50px)]">
    <ConversationsThread />
    <Chats />

    <!-- start customer view -->
    <div class="flex flex-1 mx-3"></div>
    <!--end customer view -->

  </main>
  
</template>

<script setup lang="ts">
import ConversationsThread from './subs/ConversationsThread.vue';
import Chats from './subs/Chats.vue';

</script>

<style scoped></style>
 
