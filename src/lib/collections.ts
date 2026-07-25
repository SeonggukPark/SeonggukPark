type DraftableEntry = {
  data: {
    draft: boolean;
  };
};

type DatedEntry = {
  data: {
    publishedAt: Date;
  };
};

export const isPublished = <T extends DraftableEntry>(entry: T) => !entry.data.draft;

export const byNewest = <T extends DatedEntry>(left: T, right: T) =>
  right.data.publishedAt.valueOf() - left.data.publishedAt.valueOf();

export const selectByIds = <T extends { id: string }>(entries: readonly T[], ids: readonly string[]) => {
  const entriesById = new Map(entries.map((entry) => [entry.id, entry]));
  return ids.flatMap((id) => {
    const entry = entriesById.get(id);
    return entry ? [entry] : [];
  });
};
