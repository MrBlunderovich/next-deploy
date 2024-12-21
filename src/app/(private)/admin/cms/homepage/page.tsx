import { cachedHomepageBannerSection } from "@/app/(private)/admin/cms/homepage/actions";
import BannerForm from "./_component/BannerForm";

export default async function CmsHomepage() {
  const bannerData = await cachedHomepageBannerSection();

  return (
    <>
      <h1 className="h1">Homepage</h1>
      <BannerForm bannerData={bannerData} />
    </>
  );
}
