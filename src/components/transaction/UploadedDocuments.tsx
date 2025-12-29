import Card from "../common/Card";
import DocumentCard from "./DocumentCard";

const UploadedDocuments = ({activeDetails}:any) => {
  return (
    <Card title="Uploaded documents (2)" className="border-blue-dark bg-gradient-to-t from-blue-light to-blue-base">
      <div className="grid grid-cols-2 gap-4">
        <DocumentCard data={activeDetails} title={activeDetails.docType} url uploadedAt="16 Dec 10:40" />
        <DocumentCard data={activeDetails} title={activeDetails.docType} uploadedAt="16 Dec 10:41" />
      </div>
    </Card>
  );
};

export default UploadedDocuments;
