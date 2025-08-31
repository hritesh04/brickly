import { DotPattern } from "../magicui/dot-pattern";

export default function DotBackGround({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[92.25vh] w-full relative">
      <DotPattern className="-z-10" height={20} width={20} />
      {children}
    </div>
  );
}
