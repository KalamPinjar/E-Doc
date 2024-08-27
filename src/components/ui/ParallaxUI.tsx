"use client";
import { cn } from "@/lib/utils";
import Parallax from "react-next-parallax";
interface ParallaxUIProps {
  children: React.ReactNode;
  className?: string;
}
const ParallaxUI: React.FC<ParallaxUIProps> = ({ children, className }) => {
  return <Parallax className={cn("w-full", className)}>{children}</Parallax>;
};

export default ParallaxUI;
