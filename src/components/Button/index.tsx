export const Button = ({ children }: { children: string | JSX.Element[] | JSX.Element }) => {
   return (
      <button className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center justify-center self-end">
         {children}
      </button>
   );
};
