<template>
  <div class="flex flex-wrap min-h-[32px] ">
        <div class="flex m-1 px-1 bg-[#D9D9D9] rounded " v-for="(tag, index) in visibleTagLists">
          <div class=" w-3 h-3 bg-red-500 rounded-full pr-3 mt-1.5 object-cover">
          </div>
          <div class="text-xs px-1.5 py-1 truncate max-w-[60px]">
              {{ tag }}
          </div>  
        </div>
        <div v-if="taglists.length > 2" class="m-1 pt-1 max-w-[100px] bg-[#00ABB3] rounded">
          <div class="text-xs px-1.5 truncate text-white" >
            + {{ taglists.length - 2 }} เพิ่มเติม
          </div>
        </div>
  </div>
</template>

<script setup lang="ts">


const taglists = [
  "tagnamesefffsfaawdwdwdad", "t", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname"
]


const visibleTagLists = taglists.filter((tag, index) => index < 2)

</script>

<style scoped></style>
