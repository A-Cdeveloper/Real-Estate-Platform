import SingleLogoUploader from "./SingleLogoUploader";

const LogosUploader = ({
  logo_dark,
  logo_light,
}: {
  logo_dark: string | null;
  logo_light: string | null;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SingleLogoUploader type="dark" logo={logo_dark} />
      <SingleLogoUploader type="light" logo={logo_light} />
    </div>
  );
};

export default LogosUploader;
