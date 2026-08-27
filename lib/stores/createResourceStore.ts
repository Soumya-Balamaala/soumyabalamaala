import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Status = 'idle' | 'loading' | 'loaded' | 'error';

interface ResourceState<T> {
  data: T;
  status: Status;
  load: () => void;
}

// Shared factory for "fetch once, cache, share across every component that
// needs it" data. Backed by sessionStorage so cached data survives page
// reloads and back/forward navigation within the same tab, but clears when
// the tab closes — avoiding indefinite staleness across visits while still
// skipping redundant refetches within one.
export function createResourceStore<T>(name: string, fetcher: () => Promise<T>, initialData: T) {
  const useStore = create<ResourceState<T>>()(
    persist(
      (set, get) => ({
        data: initialData,
        status: 'idle',
        load: () => {
          // sessionStorage rehydration is async on the client; if a
          // component's mount effect calls load() before it finishes, wait
          // and retry so we don't fire a redundant fetch that a moment
          // later would've been served from the cache.
          if (!useStore.persist.hasHydrated()) {
            useStore.persist.onFinishHydration(() => get().load());
            return;
          }
          if (get().status !== 'idle') return;
          set({ status: 'loading' });
          fetcher()
            .then((data) => set({ data, status: 'loaded' }))
            .catch((error) => {
              console.error(`Failed to load ${name}:`, error);
              set({ status: 'error' });
            });
        },
      }),
      {
        name: `resource-${name}`,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );

  return useStore;
}
