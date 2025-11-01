<template>
  <UApp>
    <div class="container flex flex-col lg:flex-row items-center lg:items-stretch lg:gap-12 p-4 m-auto prose lg:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtImg src="/logo.png" alt="Baboons United Hedingen Logo" densities="x1 x2" class="lg:sticky lg:top-12 lg:left-0"/>
      </div>
      <div class="flex-3">
        <h2>Baboons United Hedingen</h2>
      </div>
    </div>

    <UFooter>
      <template #left>
        <p class="text-sm">© {{ new Date().getFullYear() }} Baboons United Hedingen</p>
        <UButton
          size="xl"
          icon="i-solar-info-square-bold"
          color="primary"
          variant="link"
          to="https://unihockey.swiss/LeagueOrganizer/Magazine/1#/club/566"
          target="_blank"
          aria-label="Baboons United auf Swiss Unihockey"/>
      </template>
      <template #right>
        <NuxtLink to="https://www.mobiliar.ch/generalagenturen/affoltern-am-albis" target="_blank" class="flex justify-center lg:justify-end">
          <NuxtImg src="/die-mobiliar.jpg" alt="die Mobiliar" densities="x1 x2" class=" object-center w-1/2 rounded-lg"/>
        </NuxtLink>
      </template>
    </UFooter>
  </UApp>
</template>
<script setup lang="ts">
</script>
