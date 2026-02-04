import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Eye,
  ThumbsUp,
  ThumbsDown,
  FileText
} from "lucide-react";

interface Application {
  id: string;
  applicantName: string;
  scheme: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  documentsVerified: boolean;
}

export function OfficerDashboard() {
  const [selectedTab, setSelectedTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [remarks, setRemarks] = useState("");

  // Mock data
  const applications: Application[] = [
    { id: "APP001", applicantName: "Rajesh Kumar", scheme: "PM-KISAN Scheme", submittedDate: "2026-01-20", status: "pending", documentsVerified: false },
    { id: "APP002", applicantName: "Priya Sharma", scheme: "Old Age Pension", submittedDate: "2026-01-19", status: "pending", documentsVerified: true },
    { id: "APP003", applicantName: "Amit Patel", scheme: "Student Education Grant", submittedDate: "2026-01-18", status: "pending", documentsVerified: false },
    { id: "APP004", applicantName: "Sunita Devi", scheme: "Widow Pension Scheme", submittedDate: "2026-01-17", status: "approved", documentsVerified: true },
    { id: "APP005", applicantName: "Ramesh Singh", scheme: "Healthcare Subsidy", submittedDate: "2026-01-16", status: "approved", documentsVerified: true },
    { id: "APP006", applicantName: "Anita Verma", scheme: "Housing Assistance", submittedDate: "2026-01-15", status: "rejected", documentsVerified: false },
  ];

  const filteredApplications = applications.filter(app => 
    app.status === selectedTab &&
    (app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     app.scheme.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingCount = applications.filter(app => app.status === "pending").length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;

  const handleAction = (app: Application, action: "approve" | "reject") => {
    setSelectedApplication(app);
    setActionType(action);
    setShowModal(true);
  };

  const handleSubmitAction = () => {
    // In real app, this would call an API
    console.log(`${actionType} application ${selectedApplication?.id} with remarks: ${remarks}`);
    setShowModal(false);
    setSelectedApplication(null);
    setActionType(null);
    setRemarks("");
  };

  const StatusBadge = ({ status }: { status: "pending" | "approved" | "rejected" }) => {
    const styles = {
      pending: "bg-[#FFA726]/10 text-[#FFA726] border-[#FFA726]/20",
      approved: "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2">Application Verification</h1>
        <p className="text-muted-foreground">Review and process welfare scheme applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
              <p className="text-3xl">{pendingCount}</p>
            </div>
            <div className="bg-[#FFA726]/10 p-3 rounded-lg">
              <Clock className="h-8 w-8 text-[#FFA726]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Approved</p>
              <p className="text-3xl">{approvedCount}</p>
            </div>
            <div className="bg-[#4CAF50]/10 p-3 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-[#4CAF50]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rejected</p>
              <p className="text-3xl">{rejectedCount}</p>
            </div>
            <div className="bg-destructive/10 p-3 rounded-lg">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, ID, or scheme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedTab === "pending" ? "default" : "outline"}
              onClick={() => setSelectedTab("pending")}
              className={selectedTab === "pending" ? "bg-[#FFA726] hover:bg-[#FFA726]/90" : ""}
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant={selectedTab === "approved" ? "default" : "outline"}
              onClick={() => setSelectedTab("approved")}
              className={selectedTab === "approved" ? "bg-[#4CAF50] hover:bg-[#4CAF50]/90" : ""}
            >
              Approved ({approvedCount})
            </Button>
            <Button
              variant={selectedTab === "rejected" ? "default" : "outline"}
              onClick={() => setSelectedTab("rejected")}
            >
              Rejected ({rejectedCount})
            </Button>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm">Application ID</th>
                <th className="text-left p-4 text-sm">Applicant Name</th>
                <th className="text-left p-4 text-sm">Scheme</th>
                <th className="text-left p-4 text-sm">Submitted Date</th>
                <th className="text-left p-4 text-sm">Status</th>
                <th className="text-left p-4 text-sm">Documents</th>
                <th className="text-left p-4 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">{app.id}</td>
                  <td className="p-4">{app.applicantName}</td>
                  <td className="p-4">{app.scheme}</td>
                  <td className="p-4">{app.submittedDate}</td>
                  <td className="p-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="p-4">
                    {app.documentsVerified ? (
                      <span className="flex items-center gap-1 text-[#4CAF50] text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#FFA726] text-sm">
                        <Clock className="h-4 w-4" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {app.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAction(app, "approve")}
                            className="text-[#4CAF50] border-[#4CAF50]/30 hover:bg-[#4CAF50]/10"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAction(app, "reject")}
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No applications found</p>
            </div>
          )}
        </div>
      </Card>

      {/* Action Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-xl mb-2">
                {actionType === "approve" ? "Approve Application" : "Reject Application"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Application ID: {selectedApplication.id} - {selectedApplication.applicantName}
              </p>
            </div>

            <div className="mb-6">
              <Label htmlFor="remarks">Remarks / Notes *</Label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full mt-2 p-3 border border-border rounded-md min-h-[100px] bg-background"
                placeholder={`Enter reason for ${actionType}...`}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedApplication(null);
                  setActionType(null);
                  setRemarks("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAction}
                disabled={!remarks.trim()}
                className={`flex-1 ${
                  actionType === "approve" 
                    ? "bg-[#4CAF50] hover:bg-[#4CAF50]/90" 
                    : "bg-destructive hover:bg-destructive/90"
                }`}
              >
                Confirm {actionType === "approve" ? "Approval" : "Rejection"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
