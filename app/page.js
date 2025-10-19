"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Button, Spinner } from "@heroui/react";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      setUser(data?.user || null);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <Spinner label="Loading..." color="secondary" />
      </div>
    );

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center bg-background text-foreground p-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">
        Welcome to <span className="text-secondary">Dashboard App</span>
      </h1>

      <p className="text-lg text-gray-400 mb-10 max-w-xl">
        View your products, charts, and explore insights — all in one place.
      </p>

      {user ? (
        <Button
          color="secondary"
          size="lg"
          radius="full"
          className="shadow-lg hover:opacity-90"
          onPress={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      ) : (
        <Button
          color="primary"
          size="lg"
          radius="full"
          className="shadow-lg hover:opacity-90"
          onPress={() => router.push("/login")}
        >
          Login to Continue
        </Button>
      )}
    </div>
  );
}
