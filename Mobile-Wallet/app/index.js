import { useEffect } from "react";
import { router } from "expo-router";

import { Onboarding } from "../components/onboarding/Onboarding";
import { useSession } from "../hooks/ctx";


export default function Page() {
  const { isOnboard } = useSession();

  useEffect(() => {
    if (isOnboard === "true") {
      router.replace("/(tabs)");
    }
  }, [isOnboard]);

  return <Onboarding />;
}
