import { cachedHomepageBannerSection } from "@/app/(private)/admin/cms/homepage/actions";
import BannerForm from "./_component/BannerForm";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default async function CmsHomepage() {
  const bannerData = await cachedHomepageBannerSection();

  return (
    <>
      <h1 className="h1 flex items-center justify-center gap-4">
        Homepage
        <Link href={"/"}>
          <ExternalLinkIcon
            className="text-yellow-500 hover:opacity-80"
            size={40}
          />
        </Link>
      </h1>
      <BannerForm bannerData={bannerData} />
    </>
  );
}
