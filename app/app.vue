<template>
  <UApp>
    <div class="container flex flex-col lg:flex-row items-center lg:items-stretch lg:gap-12 p-4 m-auto prose lg:prose-lg max-w-7xl">
      <div class="flex-1 relative">
        <NuxtImg src="/logo.png" alt="Baboons United Hedingen Logo" densities="x1 x2" class="lg:sticky lg:top-12 lg:left-0"/>
      </div>
      <div class="flex-3">
        <h2>News</h2>

        <div class="flex flex-col md:flex-row gap-4">
          <UCard class="bg-white flex-1">
            <template #default>
              <div class="text-2xl font-bold">Lorem Ipsum</div>
              <p class="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis accumsan augue. Cras nec est sagittis, fringilla ante a,
                sollicitudin justo.</p>
              <div class="flex justify-end">
                <NuxtLink to="/">weiterlesen</NuxtLink>
              </div>
            </template>
          </UCard>

          <UCard class="bg-white flex-1">
            <template #default>
              <div class="text-2xl font-bold">Donec ac auctor erat</div>
              <p class="line-clamp-2">Sed vulputate diam sed consectetur sagittis. Quisque vitae diam non nibh mollis condimentum a in elit. Vivamus tempus augue ex, sollicitudin sagittis massa
                sagittis sed. Nunc tincidunt nibh at lacus sagittis eleifend. Curabitur et diam et nibh cursus tincidunt. Nullam nunc lacus, posuere non metus non</p>
              <div class="flex justify-end">
                <NuxtLink to="/">weiterlesen</NuxtLink>
              </div>
            </template>
          </UCard>
        </div>

        <h2>Nächste Spiele</h2>
        <div class="flex flex-col gap-4">
          <template v-if="status !== 'success'">
            <UCard v-for="i in 2" :key="i" class="bg-white">
              <div class="flex flex-col gap-4">
                <USkeleton class="h-4 w-[250px] mx-auto"/>
                <div class="flex justify-between items-center">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <USkeleton class="h-16 w-16 rounded-full"/>
                    <USkeleton class="h-6 w-32"/>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <USkeleton class="h-8 w-16"/>
                    <USkeleton class="h-4 w-24"/>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <USkeleton class="h-16 w-16 rounded-full"/>
                    <USkeleton class="h-6 w-32"/>
                  </div>
                </div>
              </div>
            </UCard>
          </template>
          <UCard v-for="game in displayedFutureGames" v-else :key="game.id" class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="text-center text-sm">{{ game.location }}</div>
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      :src="game.homeTeamLogo"
                      :alt="game.homeTeam"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2" :class="{'text-secondary': game.homeTeamId === TEAM_ID}">{{ game.homeTeam }}</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold">{{ game.time }}</div>
                    <div class="text-center">{{ game.date }}</div>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      :src="game.guestTeamLogo"
                      :alt="game.guestTeam"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2" :class="{'text-secondary': game.guestTeamId === TEAM_ID}">{{ game.guestTeam }}</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>
          <div v-if="status === 'success' && (data?.future.length ?? 0) > 2 && !showAllFuture" class="flex justify-center">
            <UButton variant="soft" class="cursor-pointer" @click="showAllFuture = true">mehr...</UButton>
          </div>
        </div>
        <h2>Letzte Resultate</h2>
        <div class="flex flex-col gap-4">
          <template v-if="status === 'pending'">
            <UCard v-for="i in 2" :key="i" class="bg-white">
              <div class="flex justify-between items-center">
                <div class="flex flex-col items-center gap-2 flex-1">
                  <USkeleton class="h-16 w-16 rounded-full"/>
                  <USkeleton class="h-6 w-32"/>
                </div>
                <div class="flex flex-col items-center gap-2 flex-1">
                  <USkeleton class="h-8 w-16"/>
                  <USkeleton class="h-4 w-24"/>
                  <USkeleton class="h-8 w-20"/>
                </div>
                <div class="flex flex-col items-center gap-2 flex-1">
                  <USkeleton class="h-16 w-16 rounded-full"/>
                  <USkeleton class="h-6 w-32"/>
                </div>
              </div>
            </UCard>
          </template>
          <UCard v-for="game in displayedPastGames" v-else :key="game.id" class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      :src="game.homeTeamLogo"
                      :alt="game.homeTeam"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2" :class="{'text-secondary': game.homeTeamId === TEAM_ID}">{{ game.homeTeam }}</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold text-secondary">{{ game.result }}</div>
                    <div class="text-center">{{ game.date.split(' ')[0] }}</div>
                    <UButton :to="`https://myapp.swissunihockey.ch/LeagueOrganizer/Magazine/1#/magazinegameview/${game.id}`" target="_blank" variant="ghost" trailing-icon="i-lucide-external-link">mehr
                    </UButton>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      :src="game.guestTeamLogo"
                      :alt="game.guestTeam"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2" :class="{'text-secondary': game.guestTeamId === TEAM_ID}">{{ game.guestTeam }}</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>
          <div v-if="status === 'success' && (data?.past?.length ?? 0) > 2 && !showAllPast" class="flex justify-center">
            <UButton variant="soft" class="cursor-pointer" @click="showAllPast = true">mehr...</UButton>
          </div>
        </div>

        <h2>Team</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <img src="https://baboons.ch/team/team.jpg" alt="Baboons United" class="w-full object-cover rounded-lg not-prose flex-1">

          <div class="flex-1">
            1 Martin Helbling<br>
            3 Florian Boppart<br>
            7 Michael Sidler<br>
            8 Luigi Biasio<br>
            9 Dani Montanari<br>
            18 Silvan Schweizer<br>
            21 Simon Streit<br>
            23 Marco Scheidegger<br>
            33 Adrian Streit<br>
            46 Adrian Meier<br>
            66 Urech Pascal<br>
            69 Reto Felder<br>
            84 Strüby Stefan
          </div>
        </div>
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
import {type GamesOverview, TEAM_ID} from "#shared/types";

const {data, status} = await useFetch<GamesOverview, unknown>('/.netlify/functions/games', {
  server: false
})

const showAllFuture = ref(false)
const showAllPast = ref(false)

const displayedFutureGames = computed(() => {
  if (!data.value?.future) return []
  return showAllFuture.value ? data.value.future : data.value.future.slice(0, 2)
})

const displayedPastGames = computed(() => {
  if (!data.value?.past) return []
  return showAllPast.value ? data.value.past : data.value.past.slice(0, 2)
})
</script>
