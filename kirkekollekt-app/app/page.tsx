import { Suspense } from "react";
import SendTestMail from "./components/client/SendTestMail";
import Organisations from "./components/server/Organisations";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Organisations />
    </Suspense>
  );
}
