import SocialLink from "./SocialLink";

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      <SocialLink icon="f" href="https://www.facebook.com" />
      <SocialLink icon="i" href="https://www.instagram.com" />
      <SocialLink icon="x" href="https://www.x.com" />
      <SocialLink icon="in" href="https://www.linkedin.com" />
    </div>
  );
};

export default SocialLinks;
