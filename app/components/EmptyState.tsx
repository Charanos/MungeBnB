"use client";

import Button from "./Button";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  showReset,
  title = "No exact matches!",
  subtitle = "Try changing or removing some of your filters",
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />

      <div className="w-48 mt-4">
        <Button
          outline
          label="Back to Home Page"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default EmptyState;
