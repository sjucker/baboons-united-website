<template>
  <UApp>
    <div class="container flex flex-col md:flex-row items-center md:items-stretch md:gap-12 p-4 m-auto prose md:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtImg src="/logo.png" alt="Baboons United Hedingen Logo" densities="x1 x2" class="md:sticky md:top-12 md:left-0"/>
      </div>
      <div class="flex-3">
        <h2>Baboons United Hedingen</h2>
      </div>
    </div>

    <UFooter>
      <template #left>
        <p class="text-sm">© {{ new Date().getFullYear() }} Baboons United Hedingen</p>
      </template>
      <template #right>
        <UButton
          size="xl"
          icon="i-solar-info-square-bold"
          color="primary"
          variant="link"
          to="https://unihockey.swiss/LeagueOrganizer/Magazine/1#/club/566"
          target="_blank"
          aria-label="Baboons United auf Swiss Unihockey"/>
      </template>
    </UFooter>
  </UApp>
</template>
<script setup lang="ts">
</script>
