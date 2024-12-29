import { ImageObject } from "@/drizzle/schema";
import Image from "next/image";

export default function PageBanner({
  image,
  title,
}: {
  image: ImageObject | undefined;
  title: string | undefined;
}) {
  return (
    <section className="PageBanner grid h-[600px] w-full [grid-template-areas:'banner']">
      <div className="relative [grid-area:banner]">
        <Image
          className="object-cover object-center"
          src={image?.src || ""}
          placeholder="blur"
          blurDataURL={image?.blurhash || ""}
          sizes="100vw"
          priority
          fill
          alt=""
        />
      </div>
      <div className="Overlay banner-shade z-10 flex flex-col items-stretch justify-center [grid-area:banner]">
        <h1 className="h1 container my-0 text-white">{title}</h1>
      </div>
    </section>
  );
}
