import Logo from "@/components/shared/Logo";

const FormWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[350px]">
      <div className="mb-8 flex justify-center">
        <Logo width={130} height={130} />
      </div>
      <div className="rounded-2xl border bg-secondary/30 px-8 py-6 shadow-sm w-full ">
        <h2 className="mb-6 text-2xl font-bold font-nunito text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
