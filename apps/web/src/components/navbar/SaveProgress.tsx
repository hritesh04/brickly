"use client";

import { observer } from "mobx-react-lite";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle, Upload } from "lucide-react";
import { useEditor } from "@/store/editor";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/useAction";
import { buildProject } from "@/actions/build";

export const SaveProgress = observer(() => {
  const editor = useEditor();
  const params = useParams();

  const { execute } = useAction(buildProject);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {editor.dirty ? (
          <Badge variant="outline" className="flex items-center gap-2">
            <XCircle className="size-4 text-red-500" />
            Not Saved
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="flex items-center gap-2 py-1 px-3"
          >
            <CheckCircle2 className="size-4 text-green-500" />
            <span className="text-sm">Saved</span>
          </Badge>
        )}
      </div>
      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={() =>
          execute({ projectID: Number(params.id), buildType: "Web" })
        }
      >
        <Upload className="w-4 h-4" />
        Publish
      </Button>
    </div>
  );
});
