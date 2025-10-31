<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import Select from '@registry/components/ui/select/Select.vue'
import SelectContent from '@registry/components/ui/select/SelectContent.vue'
import SelectGroup from '@registry/components/ui/select/SelectGroup.vue'
import SelectItem from '@registry/components/ui/select/SelectItem.vue'
import SelectLabel from '@registry/components/ui/select/SelectLabel.vue'
import SelectTrigger from '@registry/components/ui/select/SelectTrigger.vue'
import SelectValue from '@registry/components/ui/select/SelectValue.vue'
import { useSettings } from '@registry/modules/settings/composables/useSettings'
import { settingsSchema } from '@registry/modules/settings/validation/settings.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ISettingsService, Settings } from '@registry/modules/settings/types/settings.type'

const props = defineProps<{
  service?: ISettingsService
}>()

const { t } = useI18n()
const { settingsQuery, settings, updateSettings, isLoading, isUpdating, isError } = useSettings(props.service)

const getThemeValue = (darkMode: boolean | undefined) => {
  return darkMode ? 'dark' : 'light'
}

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(settingsSchema),
  initialValues: {
    darkMode: getThemeValue(settings.value?.darkMode),
    locale: settings.value?.locale,
  }
})

watch(() => settingsQuery.data.value, (val: Settings | undefined) => {
  if (val) {
    setValues({ darkMode: getThemeValue(val.darkMode), locale: val.locale })
  }
})

const onSubmit = handleSubmit(async (values) => {
  await updateSettings({
    darkMode: values.darkMode === 'dark',
    locale: values.locale,
  })
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold">
      {{ t('settings.page.title') }}
    </h1>

    <div v-if="isLoading" class="text-muted-foreground">
      {{ t('settings.page.loading') }}
    </div>
    <div v-else-if="isError" class="text-destructive">
      {{ t('settings.page.error_prefix') }}
    </div>
    <form v-else class="bg-card border rounded-lg p-6 space-y-6" @submit="onSubmit">
      <!-- Dark mode toggle -->
      <FormField v-slot="{ componentField }" name="darkMode">
        <FormItem>
          <FormLabel required>
            Dark mode
          </FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Themes</SelectLabel>
                  <SelectItem value="light">
                    Light
                  </SelectItem>
                  <SelectItem value="dark">
                    Dark
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Locale select -->
      <FormField v-slot="{ componentField }" name="locale">
        <FormItem>
          <FormLabel required>
            Locale
          </FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a locale" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Locales</SelectLabel>
                  <SelectItem value="en">
                    English
                  </SelectItem>
                  <SelectItem value="pl">
                    Polski
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-end">
        <Button type="submit" :loading="isUpdating">
          {{ t('settings.page.save') }}
        </Button>
      </div>
    </form>
  </div>
</template>

