export function enableShadowsForGroup({ group, receive, cast }) {
  group.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = Boolean(cast);
      child.receiveShadow = Boolean(receive);
    }
  });
}
