import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/dist/client/router";
import invariant from "invariant";

const HistoryContext = createContext<string[] | undefined>(undefined);

type HistoryProviderProps = {
  children: ReactNode;
};
export function HistoryProvider({ children }: HistoryProviderProps) {
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setHistory((history) => {
      if (history[history.length - 1] === router.asPath) {
        return history;
      }

      return [...history, router.asPath];
    });
  }, [router.asPath, setHistory]);

  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);

  invariant(context, "useHistory should be used within HistoryProvider");

  return context;
}
