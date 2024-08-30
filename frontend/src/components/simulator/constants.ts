type DefaultActivity = {
  label: string;
  description: string;
  displayInInitialValues: boolean;
  defaultValue: object;
};

const Activities: {
  freelance_daily_rate: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  freelance_on_delivery: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  consulting: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      enjoyment_rate: number;
    };
  };
  sponsorship: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  side_project: DefaultActivity & {
    defaultValue: {
      revenue: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  training: DefaultActivity & {
    defaultValue: {
      rate: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  digital_product: DefaultActivity & {
    defaultValue: {
      revenue: number;
      quantity: number;
      average_time_spent: number;
      enjoyment_rate: number;
    };
  };
  admin: DefaultActivity & {
    defaultValue: {
      average_time_spent: number;
    };
  };
} = {
  freelance_daily_rate: {
    label: "Mission freelance facturée au TJM",
    description: "Mission freelance que vous facturez au temps passé.",
    defaultValue: {
      rate: 100,
      quantity: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: true,
  },
  freelance_on_delivery: {
    label: "Mission freelance facturée au livrable.",
    description:
      "Mission freelance que vous facturez à la livraison du projet.",
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  consulting: {
    label: "Consulting",
    description: "Coaching, mentoring, etc.",
    defaultValue: {
      rate: 100,
      quantity: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  sponsorship: {
    label: "Sponsorship & Media",
    description: "Newsletter, épisode de podcast, post réseaux sociaux, etc.",
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  side_project: {
    label: "Side Project",
    description: "Communauté, agence, saas, etc.",
    defaultValue: {
      revenue: 100,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  training: {
    label: "Training",
    description: "Bootcamp, formation école, formation en ligne, etc.",
    defaultValue: {
      rate: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  digital_product: {
    label: "Digital Product",
    description: "Template, ebook, mini formation, etc.",
    defaultValue: {
      revenue: 100,
      quantity: 1,
      average_time_spent: 1,
      enjoyment_rate: 1,
    },
    displayInInitialValues: false,
  },
  admin: {
    label: "Admin",
    description: "Admin, vente, personal branding, etc.",
    defaultValue: {
      average_time_spent: 1,
    },
    displayInInitialValues: false,
  },
} as const;

export { Activities };
