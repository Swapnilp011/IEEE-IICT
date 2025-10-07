import Image from 'next/image';
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center relative", "h-12 w-40", className)}>
      <Image
        src="/logo.jpg"
        alt="IEEE IICT Student Branch Logo"
        fill
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
