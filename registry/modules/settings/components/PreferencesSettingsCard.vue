<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
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
import { Settings } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ISettingsService, Settings as SettingsType } from '@registry/modules/settings/types/settings.type'

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

watch(() => settingsQuery.data.value, (val: SettingsType | undefined) => {
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
  <Card>
    <CardHeader>
      <div class="flex items-center gap-2">
        <Settings :size="20" />
        <CardTitle>{{ t('settings.page.sections.preferences.title') }}</CardTitle>
      </div>
      <CardDescription>{{ t('settings.page.sections.preferences.description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="space-y-4">
        <div class="h-16 bg-muted rounded animate-pulse" />
        <div class="h-16 bg-muted rounded animate-pulse" />
      </div>

      <div v-else-if="isError" class="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4">
        {{ t('settings.page.error_prefix') }}
      </div>

      <form v-else class="space-y-6" @submit="onSubmit">
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Theme -->
          <div class="space-y-3">
            <FormField v-slot="{ componentField }" name="darkMode">
              <FormItem>
                <FormLabel required>
                  {{ t('settings.page.sections.theme.label') }}
                </FormLabel>
                <p class="text-sm text-muted-foreground">
                  {{ t('settings.page.sections.theme.subtitle') }}
                </p>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue :placeholder="t('settings.page.sections.theme.placeholder')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{{ t('settings.page.sections.theme.group_label') }}</SelectLabel>
                        <SelectItem value="light">
                          {{ t('settings.page.sections.theme.options.light') }}
                        </SelectItem>
                        <SelectItem value="dark">
                          {{ t('settings.page.sections.theme.options.dark') }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <!-- Locale -->
          <div class="space-y-3">
            <FormField v-slot="{ componentField }" name="locale">
              <FormItem>
                <FormLabel required>
                  {{ t('settings.page.sections.locale.label') }}
                </FormLabel>
                <p class="text-sm text-muted-foreground">
                  {{ t('settings.page.sections.locale.subtitle') }}
                </p>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue :placeholder="t('settings.page.sections.locale.placeholder')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{{ t('settings.page.sections.locale.group_label') }}</SelectLabel>
                        <SelectItem value="en">
                          {{ t('settings.page.sections.locale.options.en') }}
                        </SelectItem>
                        <SelectItem value="pl">
                          {{ t('settings.page.sections.locale.options.pl') }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit" :loading="isUpdating">
            {{ t('settings.page.save') }}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

