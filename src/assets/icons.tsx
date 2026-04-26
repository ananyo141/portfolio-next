import React from "react";
import {
  FiChevronDown,
  FiCode,
  FiLayout,
  FiServer,
  FiZap,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiRss,
} from "react-icons/fi";

interface IconProps {
  className?: string;
  size?: number;
}

export function ChevronDown({ className, size = 24 }: IconProps) {
  return <FiChevronDown size={size} className={className} />;
}

export function CodeBrackets({ className, size = 16 }: IconProps) {
  return <FiCode size={size} className={className} />;
}

export function GridFour({ className, size = 16 }: IconProps) {
  return <FiLayout size={size} className={className} />;
}

export function Server({ className, size = 16 }: IconProps) {
  return <FiServer size={size} className={className} />;
}

export function Sparkles({ className, size = 16 }: IconProps) {
  return <FiZap size={size} className={className} />;
}

export function User({ className, size = 16 }: IconProps) {
  return <FiUser size={size} className={className} />;
}

export function Mail({ className, size = 16 }: IconProps) {
  return <FiMail size={size} className={className} />;
}

export function Phone({ className, size = 16 }: IconProps) {
  return <FiPhone size={size} className={className} />;
}

export function MessageSquare({ className, size = 16 }: IconProps) {
  return <FiMessageSquare size={size} className={className} />;
}

export function Calendar({ className, size = 16 }: IconProps) {
  return <FiCalendar size={size} className={className} />;
}

export function Clock({ className, size = 16 }: IconProps) {
  return <FiClock size={size} className={className} />;
}

export function Github({ className, size = 18 }: IconProps) {
  return <FiGithub size={size} className={className} />;
}

export function LinkedIn({ className, size = 18 }: IconProps) {
  return <FiLinkedin size={size} className={className} />;
}

export function Twitter({ className, size = 18 }: IconProps) {
  return <FiTwitter size={size} className={className} />;
}

export function Rss({ className, size = 24 }: IconProps) {
  return <FiRss size={size} className={className} />;
}

export function Email({ className, size = 18 }: IconProps) {
  return <FiMail size={size} className={className} />;
}
