"use client";

import CustomInput from "@/components/shared/form/CustomInput";
import ErrorFormMessages from "@/components/shared/form/ErrorFormMessages";
import IconButton from "@/components/shared/ui/IconButton";
import Modal from "@/components/shared/ui/Modal";
import WarningModal from "@/components/shared/ui/WarningModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDirtyFormModal } from "@/hooks/useDirtyFormModal";
import { addNews, updateNews } from "@/server/actions/news";
import { News } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  startTransition,
  useState,
} from "react";
import { toast } from "sonner";
import NewsImageUploader from "./NewsImageUploader";

/**
 * NewsForm component
 * Displays a form for creating or updating a news item
 * @param onClose - Callback function to close the form
 * @param mode - The mode of the form ("create" or "edit")
 * @param initialData - The initial data for the form (only used for edit mode)
 */

type NewsFormMode = "create" | "edit";
type NewsFormProps = {
  onClose: () => void;
  mode: NewsFormMode;
  initialData?: News;
};

const NewsForm = ({ onClose, mode, initialData }: NewsFormProps) => {
  const [createState, createAction, createPending] = useActionState(
    addNews,
    null
  );
  const [updateState, updateAction, updatePending] = useActionState(
    updateNews,
    null
  );

  // Track if form is dirty
  const [isDirty, setIsDirty] = useState(false);
  // Track if form has been successfully submitted
  const prevSuccessRef = useRef(false);

  const state = mode === "create" ? createState : updateState;
  const formAction = mode === "create" ? createAction : updateAction;
  const pending = mode === "create" ? createPending : updatePending;

  // Use hook to handle dirty form modal
  const {
    handleClose,
    showWarning,
    handleConfirm,
    handleCancel,
    title,
    message,
  } = useDirtyFormModal({
    isDirty,
    onClose,
  });

  /**
   * State to store uploaded image URL in create mode.
   *
   * Flow for image upload in CREATE mode:
   * 1. User uploads image → NewsImageUploader uses fake ID "temp"
   * 2. Image is uploaded to IPFS via uploadNewsImage("temp")
   * 3. Server returns URL without saving to database (newsId === "temp")
   * 4. URL is stored in uploadedImageUrl state via onImageChange callback
   * 5. When form is submitted, URL is sent as hidden input field
   * 6. addNews server action saves news with image URL to database
   *
   * Flow for image upload in EDIT mode:
   * 1. User uploads image → NewsImageUploader uses real news ID
   * 2. Image is uploaded to IPFS and database is updated immediately
   * 3. No need to store URL in state (handled by NewsImageUploader)
   */
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Track form changes to determine if form is dirty
  const handleFormChange = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  // Reset dirty state and handle success
  useEffect(() => {
    const isSuccess = state?.success ?? false;

    // Only reset dirty state if success changed from false to true
    if (isSuccess && !prevSuccessRef.current && isDirty) {
      startTransition(() => {
        setIsDirty(false);
      });
    }

    prevSuccessRef.current = isSuccess;

    if (isSuccess) {
      toast.success(
        mode === "create"
          ? "News created successfully!"
          : "News updated successfully!"
      );
      handleClose(); // Use wrapped handleClose
    }
  }, [state, mode, isDirty, handleClose]);

  return (
    <Card className="min-w-full md:min-w-md border-primary/50 py-5 gap-2">
      <CardHeader className="relative">
        <IconButton
          type="button"
          variant="ghost"
          icon={X}
          label="Close form"
          className="absolute right-2 -top-4 h-6 w-6 [&>span]:hidden"
          onClick={handleClose}
        />
        <CardTitle className="text-lg">
          {mode === "create" ? "Add News" : "Edit News"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          className="space-y-5"
          onChange={handleFormChange}
        >
          {/* 
            Hidden input to send uploaded image URL when creating news.
            Only needed in create mode - in edit mode, image is saved directly via NewsImageUploader.
          */}
          {uploadedImageUrl && (
            <input type="hidden" name="image" value={uploadedImageUrl} />
          )}
          {mode === "edit" && initialData && (
            <div>
              <input type="hidden" name="id" value={initialData?.id} />
            </div>
          )}
          <div>
            <CustomInput
              id="news-title"
              label="Title"
              placeholder="Enter news title"
              labelClassName="text-sm font-medium text-muted-foreground"
              name="title"
              defaultValue={
                state && !state.success
                  ? state.data?.title
                  : initialData?.title || ""
              }
              disabled={pending}
              required
              aria-required="true"
              aria-invalid={
                state && !state.success && state.errors?.title
                  ? "true"
                  : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.title
                  ? "title-error"
                  : undefined
              }
            />
            <ErrorFormMessages
              state={state}
              fieldName="title"
              fieldId="title"
            />
          </div>
          <div>
            <label
              htmlFor="news-description"
              className="text-sm font-semibold text-muted-foreground font-nunito-sans block mb-2"
            >
              Description
            </label>
            <Textarea
              id="news-description"
              placeholder="Enter news description"
              name="description"
              rows={5}
              defaultValue={
                state && !state.success
                  ? state.data?.description
                  : initialData?.description || ""
              }
              disabled={pending}
              required
              aria-required="true"
              aria-invalid={
                state && !state.success && state.errors?.description
                  ? "true"
                  : "false"
              }
              aria-describedby={
                state && !state.success && state.errors?.description
                  ? "description-error"
                  : undefined
              }
            />
            <ErrorFormMessages
              state={state}
              fieldName="description"
              fieldId="description"
            />
          </div>
          {/* 
            NewsImageUploader is shown in both create and edit modes.
            
            CREATE mode:
            - Uses fake ID "temp" (news doesn't exist yet)
            - Image is uploaded to IPFS but not saved to database
            - URL is stored in uploadedImageUrl state via onImageChange callback
            - URL is sent with form submission as hidden input
            
            EDIT mode:
            - Uses real news ID (news already exists)
            - Image is uploaded to IPFS and database is updated immediately
            - No need for onImageChange callback (handled internally)
          */}
          <div>
            <NewsImageUploader
              newsId={mode === "edit" && initialData ? initialData.id : "temp"}
              image={
                mode === "edit" ? initialData?.image || null : uploadedImageUrl
              }
              onImageChange={(url) => {
                setUploadedImageUrl(url);
                // Mark form as dirty when image changes
                if (!isDirty) {
                  setIsDirty(true);
                }
              }}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                pending || mode === "create" ? !uploadedImageUrl : false
              }
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  <span aria-live="polite">
                    {mode === "create"
                      ? "Creating news..."
                      : "Updating news..."}
                  </span>
                </>
              ) : mode === "create" ? (
                "Create News"
              ) : (
                "Update News"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      {/* Warning Modal */}
      <Modal
        isOpen={showWarning}
        onClose={handleCancel}
        showCloseButton={false}
        disableClose={false}
      >
        <WarningModal
          isOpen={showWarning}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          title={title}
          message={message}
        />
      </Modal>
    </Card>
  );
};

export default NewsForm;
