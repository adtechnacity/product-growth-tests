import type { Metadata } from "next";
import ProductDemo from "@/components/ProductDemo";

export const metadata: Metadata = {
  title: "Product Demo — Capital One Shopping Extension",
  description: "See how the Capital One Shopping extension finds travel savings.",
};

export default function ProductDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[960px] px-6 py-8 md:px-12">
        <ProductDemo />
      </div>
    </div>
  );
}
