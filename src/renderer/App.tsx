import { dateZhCN, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/store'
import { subTheme } from '@/store/theme/subTheme'

export default defineComponent({
  setup() {
    const theme = useThemeStore()

    subTheme()

    return () => (
      <n-config-provider
        theme={theme.naiveTheme}
        theme-overrides={theme.naiveThemeOverrides}
        locale={zhCN}
        date-locale={dateZhCN}
      >
        <n-notification-provider>
          <n-message-provider>
            <n-dialog-provider>
              <n-loading-bar-provider>
                <RouterView />
              </n-loading-bar-provider>
            </n-dialog-provider>
          </n-message-provider>
        </n-notification-provider>
      </n-config-provider>
    )
  },
})
