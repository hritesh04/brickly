import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function QuickStart() {
  return (
    <div className=" grid gap-8">
      <div className=" grid gap-1">
        <p className=" text-xl font-bold">Quick Start</p>
        <p className=" font-sans text-sm">
          Start your new Project with ready to use Templates
        </p>
      </div>
      <div className="flex">
        <Card className="h-50 w-45">
          <CardContent className="flex h-full items-center flex-col gap-4">
            <div className=" bg-accent flex justify-center items-center h-full w-full">
              <PlusIcon size={40} />
            </div>
            <p className="font-semibold">Blank Template</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
