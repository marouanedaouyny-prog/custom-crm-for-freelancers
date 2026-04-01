export interface CRMData {
  leads: Array<{
    id: string;
    name: string;
    project: string;
    value: string;
    status: string;
    lastContact: string;
  }>;
  contacts: Array<{
    id: string;
    name: string;
    company: string;
    role: string;
    email: string;
  }>;
  tasks: Array<{
    id: string;
    task: string;
    due: string;
    priority: string;
  }>;
  stats: {
    activeLeads: number;
    pipelineValue: string;
    convertedThisMonth: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

export const fetchCRMData = async (): Promise<CRMData> => {
  try {
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
  } catch (error) {
    console.error('Failed to fetch CRM data:', error);
    throw {
      message: 'Failed to load CRM data. Please try again.',
      status: 500
    } as ApiError;
  }
};
