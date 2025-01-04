import {
  cachedHomepageBannerSection,
  cachedHomepageDescriptionSection,
} from "@/app/(private)/admin/cms/homepage/actions";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";

export default async function HomePage() {
  const bannerData = await cachedHomepageBannerSection();
  const descriptionData = await cachedHomepageDescriptionSection();

  return (
    <div className="flex grow flex-col items-center gap-8">
      <PageBanner image={bannerData?.image} title={bannerData?.title} />
      <section className="container">
        <h2 className="text-3xl">{descriptionData?.title}</h2>
        <p className="mt-2 whitespace-pre-wrap">
          {descriptionData?.description}
        </p>
      </section>
      <Link className="underline" href="/tasks">
        Tasks
      </Link>
    </div>
  );
}
