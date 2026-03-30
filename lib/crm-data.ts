export const fetchCRMData = async () => {
  // Mock data representing a freelancer's CRM state
  return {
    leads: [
      { id: "L-001", name: "SkyStream Solutions", project: "Dashboard Design", value: "$4,500", status: "In Discussion", lastContact: "2 days ago" },
      { id: "L-002", name: "AlphaFlow Tech", project: "E-com Scraper", value: "$2,800", status: "Proposed", lastContact: "Today" },
      { id: "L-003", name: "GlobalDev Inc.", project: "Stripe Integration", value: "$1,200", status: "Lead", lastContact: "5 days ago" },
    ],
    contacts: [
      { id: "C-1", name: "Sarah Johnson", company: "SkyStream", role: "Product Manager", email: "sarah@skystream.io" },
      { id: "C-2", name: "Michael Chen", company: "AlphaFlow", role: "Founder", email: "m.chen@alphaflow.tech" },
    ],
    tasks: [
      { id: "T-1", task: "Send proposal to AlphaFlow", due: "2024-03-22", priority: "High" },
      { id: "T-2", task: "Initial call with GlobalDev", due: "2024-03-24", priority: "Medium" },
    ],
    stats: {
      activeLeads: 8,
      pipelineValue: "$12,400",
      convertedThisMonth: 3
    }
  };
};
