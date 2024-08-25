import MailTemplateEditor from "@/app/components/client/MailTemplateEditor";
import { getMailTemplate } from "@/app/serverActions/sendMail";

export default async function MailTemplate() {
  const mailTemplateObj = await getMailTemplate();
  console.log("mail tempalte received: ", mailTemplateObj);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>Mail template here</div>
      <MailTemplateEditor template={mailTemplateObj?.template} />
    </main>
  );
}
