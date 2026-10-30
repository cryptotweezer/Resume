"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { checkIsAdmin } from "@/actions/admin";

export const useAdmin = () => {
  const { user, isLoaded } = useUser();
  const userId = user?.id ?? null;
  // The answer is kept with the user it belongs to, so a change of user reads
  // as "still loading" until that user's check comes back.
  const [result, setResult] = useState<{ userId: string; isAdmin: boolean } | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    let cancelled = false;
    checkIsAdmin()
      .then((res) => {
        if (!cancelled) setResult({ userId, isAdmin: !!res.isAdmin });
      })
      .catch((error) => {
        console.error("useAdmin: Error checking admin status:", error);
        if (!cancelled) setResult({ userId, isAdmin: false });
      });

    return () => {
      cancelled = true;
    };
  }, [userId, isLoaded]);

  if (!isLoaded) return { isAdmin: false, isLoading: true };
  if (!userId) return { isAdmin: false, isLoading: false };
  const checked = result?.userId === userId;
  return { isAdmin: checked && result.isAdmin, isLoading: !checked };
};
