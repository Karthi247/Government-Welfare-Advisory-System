import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Users,
  FileText,
  TrendingUp,
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  UserCheck,
  BookOpen,
} from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  category: string;
  applicants: number;
  status: "active" | "inactive";
}

interface Officer {
  id: string;
  name: string;
  email: string;
  applicationsHandled: number;
  status: "active" | "inactive";
}

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "schemes" | "officers">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSchemeModal, setShowSchemeModal] = useState(false);
  const [showOfficerModal, setShowOfficerModal] = useState(false);

  // Mock data
  const schemes: Scheme[] = [
    { id: "SCH001", name: "PM-KISAN Scheme", category: "Agriculture", applicants: 1245, status: "active" },
    { id: "SCH002", name: "Old Age Pension", category: "Social Welfare", applicants: 856, status: "active" },
    { id: "SCH003", name: "Student Education Grant", category: "Education", applicants: 542, status: "active" },
    { id: "SCH004", name: "Healthcare Subsidy", category: "Health", applicants: 921, status: "active" },
    { id: "SCH005", name: "Housing Assistance", category: "Housing", applicants: 324, status: "inactive" },
  ];

  const officers: Officer[] = [
    { id: "OFF001", name: "Ramesh Kumar", email: "ramesh.k@gov.in", applicationsHandled: 245, status: "active" },
    { id: "OFF002", name: "Priya Singh", email: "priya.s@gov.in", applicationsHandled: 312, status: "active" },
    { id: "OFF003", name: "Amit Sharma", email: "amit.sh@gov.in", applicationsHandled: 198, status: "active" },
    { id: "OFF004", name: "Sunita Patel", email: "sunita.p@gov.in", applicationsHandled: 276, status: "inactive" },
  ];

  const StatusBadge = ({ status }: { status: "active" | "inactive" }) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs border ${
          status === "active"
            ? "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">System Administration</h1>
          <p className="text-muted-foreground">Manage schemes, officers, and system analytics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedTab === "overview" ? "default" : "outline"}
            onClick={() => setSelectedTab("overview")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={selectedTab === "schemes" ? "default" : "outline"}
            onClick={() => setSelectedTab("schemes")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Schemes
          </Button>
          <Button
            variant={selectedTab === "officers" ? "default" : "outline"}
            onClick={() => setSelectedTab("officers")}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Officers
          </Button>
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === "overview" && (
        <>
          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl">24,567</p>
                  <p className="text-xs text-[#4CAF50] mt-1">+12% this month</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Schemes</p>
                  <p className="text-3xl">24</p>
                  <p className="text-xs text-muted-foreground mt-1">2 pending review</p>
                </div>
                <div className="bg-[#A8C2CC]/20 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                  <p className="text-3xl">3,888</p>
                  <p className="text-xs text-[#4CAF50] mt-1">+8% this month</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Officers</p>
                  <p className="text-3xl">18</p>
                  <p className="text-xs text-muted-foreground mt-1">4 on leave</p>
                </div>
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-sm">
              <h3 className="mb-4">Application Trends</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Approved</span>
                    <span className="text-[#4CAF50]">68%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#4CAF50] w-[68%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pending</span>
                    <span className="text-[#FFA726]">22%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#FFA726] w-[22%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rejected</span>
                    <span className="text-destructive">10%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive w-[10%]"></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <h3 className="mb-4">Top Performing Schemes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="mb-1">PM-KISAN Scheme</p>
                    <p className="text-sm text-muted-foreground">Agriculture</p>
                  </div>
                  <p className="text-lg">1,245</p>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="mb-1">Healthcare Subsidy</p>
                    <p className="text-sm text-muted-foreground">Health</p>
                  </div>
                  <p className="text-lg">921</p>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="mb-1">Old Age Pension</p>
                    <p className="text-sm text-muted-foreground">Social Welfare</p>
                  </div>
                  <p className="text-lg">856</p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Schemes Tab */}
      {selectedTab === "schemes" && (
        <>
          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={() => setShowSchemeModal(true)} className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Scheme
              </Button>
            </div>
          </Card>

          <Card className="shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm">Scheme ID</th>
                    <th className="text-left p-4 text-sm">Scheme Name</th>
                    <th className="text-left p-4 text-sm">Category</th>
                    <th className="text-left p-4 text-sm">Applicants</th>
                    <th className="text-left p-4 text-sm">Status</th>
                    <th className="text-left p-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme) => (
                    <tr key={scheme.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">{scheme.id}</td>
                      <td className="p-4">{scheme.name}</td>
                      <td className="p-4">{scheme.category}</td>
                      <td className="p-4">{scheme.applicants.toLocaleString()}</td>
                      <td className="p-4">
                        <StatusBadge status={scheme.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Officers Tab */}
      {selectedTab === "officers" && (
        <>
          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search officers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={() => setShowOfficerModal(true)} className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Officer
              </Button>
            </div>
          </Card>

          <Card className="shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm">Officer ID</th>
                    <th className="text-left p-4 text-sm">Name</th>
                    <th className="text-left p-4 text-sm">Email</th>
                    <th className="text-left p-4 text-sm">Applications Handled</th>
                    <th className="text-left p-4 text-sm">Status</th>
                    <th className="text-left p-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {officers.map((officer) => (
                    <tr key={officer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">{officer.id}</td>
                      <td className="p-4">{officer.name}</td>
                      <td className="p-4">{officer.email}</td>
                      <td className="p-4">{officer.applicationsHandled}</td>
                      <td className="p-4">
                        <StatusBadge status={officer.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Add Scheme Modal */}
      {showSchemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <h3 className="text-xl mb-4">Add New Scheme</h3>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="schemeName">Scheme Name *</Label>
                <Input id="schemeName" className="mt-2" placeholder="Enter scheme name" />
              </div>
              <div>
                <Label htmlFor="schemeCategory">Category *</Label>
                <Input id="schemeCategory" className="mt-2" placeholder="Enter category" />
              </div>
              <div>
                <Label htmlFor="schemeDescription">Description *</Label>
                <textarea
                  id="schemeDescription"
                  className="w-full mt-2 p-3 border border-border rounded-md min-h-[100px] bg-background"
                  placeholder="Enter scheme description"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowSchemeModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-accent hover:bg-accent/90">Create Scheme</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Officer Modal */}
      {showOfficerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <h3 className="text-xl mb-4">Add New Officer</h3>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="officerName">Full Name *</Label>
                <Input id="officerName" className="mt-2" placeholder="Enter officer name" />
              </div>
              <div>
                <Label htmlFor="officerEmail">Email *</Label>
                <Input id="officerEmail" type="email" className="mt-2" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="officerPhone">Phone Number *</Label>
                <Input id="officerPhone" type="tel" className="mt-2" placeholder="Enter phone number" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowOfficerModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-accent hover:bg-accent/90">Add Officer</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
