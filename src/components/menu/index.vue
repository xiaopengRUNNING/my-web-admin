<script lang="tsx">
import { compile } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { listenerRouteChange } from '@/utils/router-listener.ts';
import useMenuTree from './useMenuTree.ts';
import { useAppState } from '@/store';

export default defineComponent({
  setup() {
    const { menuTree } = useMenuTree();
    const router = useRouter();
    const appState = useAppState();
    const selectedKey = ref<string[]>([]);

    const collapsed = computed({
      get() {
        return appState.menuCollapse;
      },
      set(value: boolean) {
        appState.updateSettings({ menuCollapse: value });
      },
    });

    listenerRouteChange((newRoute) => {
      if (newRoute.meta.auth && !newRoute.meta.hide) {
        const key = newRoute.matched[newRoute.matched.length - 1]
          ?.name as string;
        selectedKey.value = [key];
      }
    }, true);

    const onGoto = (route: RouteRecordRaw) => {
      router.push({ name: route.name });
    };
    const onSetCollapse = (val: boolean) => {
      appState.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            const icon = element?.meta?.icon
              ? () => h(compile(`<${element?.meta?.icon}/>`))
              : null;

            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => element?.meta?.title || '',
                  }}
                >
                  {travel(element.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  key={element?.name}
                  v-slots={{ icon }}
                  onClick={() => onGoto(element)}
                >
                  {element?.meta?.title || ''}
                </a-menu-item>
              );
            nodes.push(node);
          });
        }
        return nodes;
      }
      return travel(menuTree);
    };

    return () => (
      <a-menu
        v-model:collapsed={collapsed.value}
        auto-open-selected={true}
        show-collapse-button={true}
        selected-keys={selectedKey.value}
        level-indent={34}
        style="height: 100%"
        onCollapse={onSetCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
