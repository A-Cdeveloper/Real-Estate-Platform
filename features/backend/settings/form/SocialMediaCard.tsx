import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import CustomInput from "@/components/shared/form/CustomInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";

type SocialMediaCardProps = {
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  linkedin: string | null;
  youtube: string | null;
  errors: {
    facebook?: string[];
    instagram?: string[];
    x?: string[];
    linkedin?: string[];
    youtube?: string[];
  };
  handleBlur: (
    name: "facebook" | "instagram" | "x" | "linkedin" | "youtube",
    value: string
  ) => void;
};

const SocialMediaCard = ({
  facebook,
  instagram,
  x,
  linkedin,
  youtube,
  errors,
  handleBlur,
}: SocialMediaCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-green-500/10">
          <Facebook
            className="size-4 text-green-600 dark:text-green-400"
            aria-hidden="true"
          />
        </div>
        Social Media
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Facebook */}
      <div>
        <label
          htmlFor="facebook"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Facebook className="size-3.5" aria-hidden="true" />
          Facebook
        </label>
        <CustomInput
          id="facebook"
          placeholder="Facebook page URL"
          defaultValue={facebook ?? ""}
          name="facebook"
          onBlur={(e) => handleBlur("facebook", e.target.value)}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { facebook: errors.facebook || [] } }}
          fieldName="facebook"
          fieldId="facebook"
        />
      </div>

      {/* Instagram */}
      <div>
        <label
          htmlFor="instagram"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Instagram className="size-3.5" aria-hidden="true" />
          Instagram
        </label>
        <CustomInput
          id="instagram"
          placeholder="Instagram profile URL"
          defaultValue={instagram ?? ""}
          name="instagram"
          onBlur={(e) => handleBlur("instagram", e.target.value)}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { instagram: errors.instagram || [] } }}
          fieldName="instagram"
          fieldId="instagram"
        />
      </div>

      {/* X (Twitter) */}
      <div>
        <label
          htmlFor="x"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Twitter className="size-3.5" aria-hidden="true" />
          X (Twitter)
        </label>
        <CustomInput
          id="x"
          placeholder="X (Twitter) profile URL"
          defaultValue={x ?? ""}
          name="x"
          onBlur={(e) => handleBlur("x", e.target.value)}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { x: errors.x || [] } }}
          fieldName="x"
          fieldId="x"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label
          htmlFor="linkedin"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Linkedin className="size-3.5" aria-hidden="true" />
          LinkedIn
        </label>
        <CustomInput
          id="linkedin"
          placeholder="LinkedIn company page URL"
          defaultValue={linkedin ?? ""}
          name="linkedin"
          onBlur={(e) => handleBlur("linkedin", e.target.value)}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { linkedin: errors.linkedin || [] } }}
          fieldName="linkedin"
          fieldId="linkedin"
        />
      </div>

      {/* YouTube */}
      <div>
        <label
          htmlFor="youtube"
          className="text-sm font-medium mb-2 flex items-center gap-2"
        >
          <Youtube className="size-3.5" aria-hidden="true" />
          YouTube
        </label>
        <CustomInput
          id="youtube"
          placeholder="YouTube channel URL"
          defaultValue={youtube ?? ""}
          name="youtube"
          onBlur={(e) => handleBlur("youtube", e.target.value)}
        />
        <ErrorFormMessages
          state={{ success: false, errors: { youtube: errors.youtube || [] } }}
          fieldName="youtube"
          fieldId="youtube"
        />
      </div>
    </CardContent>
  </Card>
);

export default SocialMediaCard;
