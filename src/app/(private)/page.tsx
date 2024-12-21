import { cachedHomepageBannerSection } from "@/app/(private)/admin/cms/homepage/actions";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";

export default async function HomePage() {
  const bannerData = await cachedHomepageBannerSection();

  return (
    <div className="flex grow flex-col items-center gap-8">
      <PageBanner
        imageSrc={bannerData?.image?.src || ""}
        title={bannerData?.title || ""}
      />
      <section className="container">
        <h2 className="text-3xl">Section Title</h2>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
          consequuntur. Nam tempora culpa dicta veritatis? Eveniet pariatur
          repellendus, blanditiis provident, mollitia quaerat aperiam ex magnam
          dolorem totam ducimus odit saepe quae doloremque sunt. Voluptas ea
          eligendi nam tenetur recusandae impedit culpa, deleniti quasi
          mollitia, odit aperiam autem qui similique magni dolore sapiente?
          Molestias accusantium optio placeat iusto, eum unde obcaecati
          dignissimos consectetur dolores in consequatur similique ab,
          distinctio suscipit ullam facilis quasi, autem modi odio perferendis
          quaerat magnam sequi. Sapiente asperiores modi deleniti dolores omnis
          mollitia soluta tenetur iusto, pariatur est praesentium repudiandae
          magnam vel nisi neque at natus consequuntur explicabo temporibus
          dolore inventore ratione accusantium? Nam delectus, ab harum molestiae
          sit reprehenderit provident error ducimus, facilis impedit odit vel
          molestias odio suscipit! Nulla a veniam nihil soluta eum, autem
          maiores laudantium ex, odit repellat dolore ea dicta excepturi maxime?
          Facilis sit odio fuga temporibus nihil quod aut commodi saepe error
          dolore voluptas odit sed nemo eos quam expedita modi voluptates,
          laudantium labore beatae! Nisi provident mollitia est ipsa molestiae
          iure optio libero earum perspiciatis nam vero debitis beatae
          distinctio, temporibus nostrum ducimus. Quo illo vel aliquam est ex ab
          quas facilis sit nostrum ut eveniet odio, necessitatibus aliquid iusto
          porro cum eius ratione assumenda. Ex qui facilis sint eligendi
          consectetur unde quisquam a ab, omnis fugit, labore officia ipsum
          ducimus illum est tenetur repellat alias dicta velit iusto quam
          veniam. Veritatis quos sint ad nulla quo. Ipsam sint minima unde error
          ex fuga quam, at dicta aliquid accusamus voluptatem nulla. Alias
          blanditiis fugit distinctio similique nostrum? Quidem similique beatae
          accusantium dignissimos expedita quia iste officiis aspernatur alias,
          esse excepturi nobis veniam doloremque ea, nostrum mollitia unde illo
          eius. Obcaecati nulla id numquam ratione possimus atque temporibus rem
          aliquam sunt cum nihil distinctio inventore incidunt, quibusdam eius
          provident libero harum.
        </p>
      </section>
      <Link className="underline" href="/tasks">
        Tasks
      </Link>
    </div>
  );
}
