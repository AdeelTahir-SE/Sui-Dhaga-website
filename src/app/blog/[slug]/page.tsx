import { BlogDetailPage } from "@/components/blog/blog-detail-page";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <BlogDetailPage slug={resolvedParams.slug} />;
}
