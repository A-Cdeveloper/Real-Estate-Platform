"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Image as ImageIcon, Images } from "lucide-react";

const ImageGalleryCard = () => {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-blue-500/10">
              <ImageIcon className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            Main Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Main Image Placeholder */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 flex items-center justify-center h-[200px] bg-muted/20 hover:bg-muted/30 transition-colors">
            <div className="text-center space-y-2">
              <ImageIcon className="size-8 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                First uploaded image will be main
              </p>
              <p className="text-xs text-muted-foreground/70">
                Coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-purple-500/10">
              <Images className="size-4 text-purple-600 dark:text-purple-400" />
            </div>
            Image Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Gallery Placeholder */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 flex items-center justify-center h-[300px] bg-muted/20 hover:bg-muted/30 transition-colors">
            <div className="text-center space-y-2">
              <Images className="size-8 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                Upload Gallery Images
              </p>
              <p className="text-xs text-muted-foreground/70">
                Coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageGalleryCard;

