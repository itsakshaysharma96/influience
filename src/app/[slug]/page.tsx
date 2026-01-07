import CaseStudyDetail from "@/screens/CaseStudyDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyDetail slug={slug} />;
}

