import Image from 'next/image';
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="IEEE IICT Student Branch Logo"
        width={160}
        height={40}
        priority
        className="h-10 w-auto"
      />
    </div>
  );
};

export default Logo;
