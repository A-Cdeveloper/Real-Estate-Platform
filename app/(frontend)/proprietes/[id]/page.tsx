import type { Metadata } from "next";
import { APP_NAME, SITE_URL } from "@/lib/constants";
import PropertyGallery from "@/components/frontend/proprietes/details/PropertyGallery";
import RealtyTopImage from "@/components/frontend/proprietes/details/RealtyTopImage";
import RealyAgent from "@/components/frontend/proprietes/details/RealyAgent";
import RealyDescription from "@/components/frontend/proprietes/details/RealyDescription";
import RealyDetails from "@/components/frontend/proprietes/details/RealyDetails";
import { getPropertyById } from "@/lib/queries/properties";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const property = await getPropertyById(id);

    const title = `${property.name} | ${APP_NAME}`;
    const description =
      property.description ||
      `${property.name}${
        property.address ? ` located at ${property.address}` : ""
      }. Price: $${property.price.toLocaleString()}.${
        property.area ? ` Area: ${property.area} m².` : ""
      }`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/proprietes/${id}`,
        type: "website",
      },
    };
  } catch {
    return {
      title: `Property | ${APP_NAME}`,
      description: `View property details on ${APP_NAME}`,
    };
  }
}

const RealtyDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  let property;
  try {
    property = await getPropertyById(id);
  } catch {
    notFound();
  }

  return (
    <>
      {/* Hero Image Section */}
      <RealtyTopImage property={property} />

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price & Key Features */}
            <RealyDetails property={property} />

            {/* Description */}
            <RealyDescription description={property.description || ""} />

            {/* Gallery */}
            <PropertyGallery property={property} />
          </div>

          {/* Right Column - Contact & Owner Info */}
          <RealyAgent property={property} />
        </div>
      </section>
    </>
  );
};

export default RealtyDetailPage;
