import AgeGate from "@/components/AgeGate";

interface RegionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}

export default async function RegionLayout({ children, params }: RegionLayoutProps) {
  const { region } = await params;

  return (
    <div className="category-page">
      <AgeGate regionSlug={region} />
      {children}
    </div>
  );
}
