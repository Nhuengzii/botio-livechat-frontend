<template>
  <div class="flex flex-wrap ">
    <div class="w-4/5  ">
      <div class="flex flex-wrap text-gray-700 text-start   py-2  ">
        <div v-for="(tag, index) in visibleTagLists">
          <div class="flex p-2 m-1 bg-[#D9D9D9] rounded">
            <div class="w-3 h-3 bg-red-500 rounded-full mt-0.5"></div>
            <div class="text-xs px-2 truncate">
              {{ tag }}
            </div>
          </div>
        </div>
        <div v-if="taglists.length > 2" class="flex p-2 m-1 bg-[#00ABB3] rounded">
          <div class="text-xs px-2 truncate">
            + {{ taglists.length - 2 }} เพิ่มเติม
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">


const taglists = [
  "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname", "tagname"
]


const visibleTagLists = taglists.filter((tag, index) => index < 2)

</script>

<style scoped></style>
