import CaseStudyDetail from "@/screens/CaseStudyDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  // Check if the parameter is numeric (ID) or a slug
  const isNumeric = /^\d+$/.test(id);
  return <CaseStudyDetail id={isNumeric ? id : undefined} slug={isNumeric ? undefined : id} />;
}

