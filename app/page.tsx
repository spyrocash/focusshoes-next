import { ExampleApp } from "@/components/example1/ExampleApp";
import { PushNotificationManager } from "@/components/pwa/PushNotificationManager";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

export const revalidate = 1800;

export default function Home() {
  return (
    <>
      <ExampleApp />
      <PushNotificationManager />
      <InstallPrompt />
    </>
  );
}
