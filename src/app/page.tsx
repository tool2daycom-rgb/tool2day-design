import { PrefsProvider } from "@/components/prefs-provider";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <PrefsProvider>
      <SiteShell />
    </PrefsProvider>
  );
}
