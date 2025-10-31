<script setup lang="ts">
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
import { useUser } from '@registry/modules/user/composables/useUser'
import { Edit, Mail, User as UserIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import type { IUserService } from '@registry/modules/user/types/user.type'

const props = defineProps<{
  service?: IUserService
}>()

const { t } = useI18n()
const { profile, isLoading, isError, error } = useUser(props.service)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">
        {{ t('user.profile.title') }}
      </h1>
      <ButtonLink variant="outline" to="/profile/edit">
        <Edit class="size-4 mr-2" />
        {{ t('user.profile.edit_button') }}
      </ButtonLink>
    </div>

    <div v-if="isLoading" class="text-center py-8">
      <p class="text-muted-foreground">
        {{ t('user.profile.loading') }}
      </p>
    </div>

    <div v-else-if="isError" class="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
      <p class="text-destructive">
        {{ t('user.profile.error_prefix') }}: {{ (error as Error)?.message || 'Unknown error' }}
      </p>
    </div>

    <div v-else-if="profile" class="bg-card border rounded-lg p-6 space-y-6">
      <div class="flex items-center space-x-6">
        <div
          v-if="profile.avatar"
          class="size-24 rounded-full bg-muted flex items-center justify-center overflow-hidden"
        >
          <img :src="profile.avatar" :alt="profile.name" class="size-full object-cover">
        </div>
        <div
          v-else
          class="size-24 rounded-full bg-muted flex items-center justify-center"
        >
          <UserIcon class="size-12 text-muted-foreground" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold">
            {{ profile.name }}
          </h2>
          <div class="flex items-center mt-2 text-muted-foreground">
            <Mail class="size-4 mr-2" />
            <span>{{ profile.email }}</span>
          </div>
        </div>
      </div>

      <div class="border-t pt-4 space-y-4">
        <div>
          <label class="text-sm font-medium text-muted-foreground">{{ t('user.profile.user_id_label') }}</label>
          <p class="text-sm font-mono mt-1">
            {{ profile.id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
