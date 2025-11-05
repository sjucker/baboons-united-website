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
          <UCard class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="text-center text-sm">Kirchwies, Egg b. Zürich</div>
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/f49c470a-fc49-4d42-9e51-dc423094bb8e_7689image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2">Rämi Floorball Zürich</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold">09:00</div>
                    <div class="text-center">Sonntag, 30. November</div>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/79b1857e-bb91-4bd8-9333-a6c4a9edc9af_12214image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-secondary text-center line-clamp-2">Baboons Hedingen</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>

          <UCard class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="text-center text-sm">Kirchwies, Egg b. Zürich</div>
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/79b1857e-bb91-4bd8-9333-a6c4a9edc9af_12214image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-secondary text-center line-clamp-2">Baboons Hedingen</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold">11:45</div>
                    <div class="text-center">Sonntag, 30. November</div>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/b5b2ff28-e669-41bc-9afb-0c857993cb82_124.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2">Pfannenstiel Egg</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>
        </div>
        <h2>Letzte Resultate</h2>
        <div class="flex flex-col gap-4">
          <UCard class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/79b1857e-bb91-4bd8-9333-a6c4a9edc9af_12214image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-secondary text-center line-clamp-2">Baboons Hedingen</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold text-secondary">9-7</div>
                    <div class="text-center">Sonntag, 28. September</div>
                    <UButton to="https://unihockey.swiss/LeagueOrganizer/Magazine/1#/magazinegameview/93257" target="_blank" variant="ghost" trailing-icon="i-lucide-external-link">mehr
                    </UButton>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/2afeaab8-c726-42bb-aa0e-7f8b2b0882e8_90.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2">UHC Phantoms Rafzerfeld</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>

          <UCard class="bg-white">
            <template #default>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/7a37baa2-f92f-460a-b3ba-64caa50f8e8b_3936image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-center line-clamp-2">TV Mellingen</div>
                  </div>
                  <div class="flex flex-col justify-center items-center flex-1">
                    <div class="text-3xl font-bold text-secondary">3 - 7</div>
                    <div class="text-center">Sonntag, 28. September</div>
                    <UButton to="https://unihockey.swiss/LeagueOrganizer/Magazine/1#/magazinegameview/93255" target="_blank" variant="ghost" trailing-icon="i-lucide-external-link">mehr</UButton>
                  </div>
                  <div class="flex flex-col items-center gap-2 flex-1">
                    <img
                      src="https://swissunihockeysa.blob.core.windows.net/clublogos/79b1857e-bb91-4bd8-9333-a6c4a9edc9af_12214image400.png"
                      class="w-16 h-16 object-cover not-prose">
                    <div class="uppercase font-bold text-xl text-secondary text-center line-clamp-2">Baboons Hedingen</div>
                  </div>
                </div>
              </div>
            </template>
          </UCard>
        </div>

        <h2>Team</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <img src="https://baboons.ch/team/team.jpg" class="w-full object-cover rounded-lg not-prose flex-1">

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
</script>
