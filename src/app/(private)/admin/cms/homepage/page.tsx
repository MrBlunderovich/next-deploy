import {
  cachedHomepageBannerSection,
  cachedHomepageDescriptionSection,
} from "@/app/(private)/admin/cms/homepage/actions";
import BannerForm from "./_components/BannerForm";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import DescriptionForm from "./_components/DescriptionForm";
import GalleryForm from "../_modules/gallery/GalleryForm";

export default async function CmsHomepage() {
  const bannerData = await cachedHomepageBannerSection();
  const descriptionData = await cachedHomepageDescriptionSection();

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
      <DescriptionForm descriptionData={descriptionData} />
      <GalleryForm sectionName="Gallery" data={null} />
    </>
  );
}
