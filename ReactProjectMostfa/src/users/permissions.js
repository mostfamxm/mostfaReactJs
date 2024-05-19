export const checkPermissions = (permissions, userRoleType) => {
  return permissions?.includes(userRoleType);
};

export const checkAllPermissions = (permissions, userRoleType) => {
  if (!permissions) return false;
  for (var perm of userRoleType) {
    if (!permissions.includes(perm)) return false;
  }
  return true;
};
