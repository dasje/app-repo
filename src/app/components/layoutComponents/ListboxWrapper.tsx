interface ListBoxWrapperInterface {
  owner: boolean;
  children: React.ReactNode;
}

export const ListboxWrapper = ({
  owner,
  children,
}: ListBoxWrapperInterface) => (
  <div
    className={`${
      owner ? "bg-black text-white" : "bg-white"
    } w-full md:max-w-[560px] md:h-full max-h-[800px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100`}
  >
    {children}
  </div>
);
