import Projects from "@/components/dashboard/Projects";
import QuickStart from "@/components/dashboard/QuickStart";

export default function Dashboard() {
  return (
    <div className="grid h-full w-full px-24 py-4 gap-12">
      <QuickStart />
      <Projects />
    </div>
  );
}
