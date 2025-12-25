import CaseStudyDetail from "@/screens/CaseStudyDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  return <CaseStudyDetail id={id} />;
}

