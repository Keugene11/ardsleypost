"use client";

import { LoginModal } from "@/components/login-modal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-bg">
      <LoginModal onClose={() => router.push("/")} />
    </div>
  );
}
