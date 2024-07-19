export const AppBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-fit md:h-full max-h-[800px] border-small px-1 py-2 m-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
};
