import type { Metadata } from "next";
import { VelocityShowroom } from "@/components/templates/velocity-showroom";

export const metadata: Metadata = {
  title: "Velocity — Car Showroom Template",
  description:
    "Full website template for a premium car showroom: inventory, featured models, and contact.",
};

export default function VelocityTemplatePage() {
  return <VelocityShowroom />;
}
