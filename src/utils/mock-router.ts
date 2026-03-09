export const useRouter = () => {
  if (typeof window !== 'undefined' && (window as any).mockRouter) {
    return (window as any).mockRouter;
  }
  return {
    push: () => {},
    replace: () => {},
    back: () => {},
  };
};
export const useLocalSearchParams = () => ({});
export const Stack = {
  Screen: ({ children }: any) => children,
};
export const Tabs = ({ children }: any) => children;
export const Redirect = () => null;
