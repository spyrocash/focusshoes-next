import { Home } from "@/features/home";
// import { PushNotificationManager } from "@/components/pwa/PushNotificationManager";
// import { InstallPrompt } from "@/components/pwa/InstallPrompt";

export const revalidate = 1800;

export default function Page() {
  return (
    <>
      <Home />
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
    </>
  );
}
