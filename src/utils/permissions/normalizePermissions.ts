import { OptionGroup } from "../../components/common/EditModal/ExpandableOptionGroup";

export const normalizePermissions = (rolePermission: any[]) => {
  const groups: OptionGroup[] = rolePermission.map((group) => ({
    groupKey: group.permission,
    title: group.permission,
    expandable: true,
    items: group.permissionList.map((item: any) => ({
      key: item.menu,
      label: item.menu,
    })),
  }));

  const selected: Record<string, Set<string>> = {};

  rolePermission.forEach((group) => {
    selected[group.permission] = new Set(
      group.permissionList
        .filter((p: any) => p.isActive)
        .map((p: any) => p.menu)
    );
  });

  return { groups, selected };
};
