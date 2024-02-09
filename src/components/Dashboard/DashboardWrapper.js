import OnlineCrisis from "@/components/Crisis/OnlineCrisis"
import NewCrisis from "@/components/Info/NewCrisis"
import Timeline from "@/components/Timeline/Timeline"
import PostWrapper from "@/components/PostTypes/PostWrapper"
import DownloadList from "@/components/Lists/DownloadList"

export default function DashboardWrapper({ crises, activeCrisis, setActiveCrisis, documents, setDocuments }) {

  return <>
    <div className={"absolute top-0 right-0 flex gap-4"}>
      <span className={"ml-auto btn btn--primary btn--label"}>Participant view</span>
      <span className={"ml-auto btn btn--success btn--label"}>Admin view</span>
    </div>
    {
      crises &&
      <OnlineCrisis crises={crises} activeCrisis={activeCrisis} setActiveCrisis={setActiveCrisis} />
    }
    <div className={"online-timeline col-span-12"}>
      <Timeline form={false} timeline={crises.data[0].timeline} />
    </div>

    <PostWrapper />

    <DownloadList items={documents} setItems={setDocuments} type={'documents'}/>
  </>
}
