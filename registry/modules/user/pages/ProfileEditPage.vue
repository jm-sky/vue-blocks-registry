<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useUser } from '@registry/modules/user/composables/useUser'
import { profileSchema } from '@registry/modules/user/validation/profile.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowLeft } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IUserService, UpdateUserProfileData } from '@registry/modules/user/types/user.type'

const props = defineProps<{
  service?: IUserService
}>()

const { t } = useI18n()
const router = useRouter()
const { profileQuery, updateProfile, isUpdatingProfile } = useUser(props.service)

const { handleSubmit, setErrors, setValues } = useForm({
  validationSchema: toTypedSchema(profileSchema),
  initialValues: {
    name: '',
    email: '',
  }
})

// Populate form with current profile data when loaded
onMounted(() => {
  const profileData = profileQuery.data.value
  if (profileData) {
    setValues({
      name: profileData.name,
      email: profileData.email,
    })
  }
})

// Watch for profile data changes
watch(() => profileQuery.data.value, (newProfile) => {
  if (newProfile) {
    setValues({
      name: newProfile.name,
      email: newProfile.email,
    })
  }
})

const onSubmit = handleSubmit(async (values: UpdateUserProfileData) => {
  try {
    await updateProfile(values)
    // Redirect to profile view on success
    await router.push({ name: 'profile' })
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occurred in profile update')
      console.error('Profile update error:', err)
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center space-x-4">
      <ButtonLink
        variant="ghost"
        size="icon"
        to="/profile"
      >
        <ArrowLeft class="size-4" />
      </ButtonLink>
      <h1 class="text-3xl font-bold">
        {{ t('user.edit.title') }}
      </h1>
    </div>

    <div v-if="profileQuery.isLoading" class="text-center py-8">
      <p class="text-muted-foreground">
        {{ t('user.edit.loading') }}
      </p>
    </div>

    <div v-else-if="profileQuery.isError" class="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
      <p class="text-destructive">
        {{ t('user.edit.error_prefix') }}: {{ (profileQuery.error.value as Error)?.message ?? 'Unknown error' }}
      </p>
    </div>

    <form v-else class="bg-card border rounded-lg p-6 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel required>
            {{ t('user.edit.name_label') }}
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              :placeholder="t('user.edit.name_placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel required>
            {{ t('user.edit.email_label') }}
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              :placeholder="t('user.edit.email_placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-end space-x-4">
        <ButtonLink variant="outline" to="/profile">
          {{ t('user.edit.cancel') }}
        </ButtonLink>
        <Button type="submit" :loading="isUpdatingProfile">
          {{ t('user.edit.save_changes') }}
        </Button>
      </div>
    </form>
  </div>
</template>

