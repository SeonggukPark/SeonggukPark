export const projectOrder = [
  "container-crane-automation",
  "linux-realtime-rps-server",
  "s32k-home-appliance-control",
  "air-conditioner-clustering",
  "pcb-defect-detection",
  "vision-transformer-quantization",
] as const;

const projectPriority = new Map<string, number>(projectOrder.map((id, index) => [id, index]));

export const sortProjects = <T extends { id: string }>(projects: readonly T[]) =>
  [...projects].sort((left, right) => {
    const priorityDifference =
      (projectPriority.get(left.id) ?? Number.MAX_SAFE_INTEGER) -
      (projectPriority.get(right.id) ?? Number.MAX_SAFE_INTEGER);

    return priorityDifference || left.id.localeCompare(right.id);
  });
