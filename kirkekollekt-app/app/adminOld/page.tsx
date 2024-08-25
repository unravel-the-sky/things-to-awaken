import { Suspense } from "react";
import Organisations from "../components/server/Organisations";
import Loading from "../loading";
import AddNewOrganisationButton from "../components/client/AddNewOrganisationButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationsLog from "../components/server/Donations";

export default function AdminPage() {
  return <div>Admin page here</div>;
}

const AdminPageTabsOld = () => {
  return (
    <Tabs defaultValue="organisations" className="">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="organisations">Organisations</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="organisations" className="flex flex-col gap-4">
        <AddNewOrganisationButton />
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col gap-4">
            <Organisations isAdmin={true} />
          </div>
        </Suspense>
      </TabsContent>
      <TabsContent value="logs">
        <DonationsLog />
      </TabsContent>
    </Tabs>
  );
};
