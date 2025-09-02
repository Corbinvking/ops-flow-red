// Airtable Configuration - Operators will paste real IDs here
export const AT = {
  baseId: "appXXXXXXXXXXXXXX", // Operators will replace with real Airtable Base ID
  tables: {
    instagram: "tblIGXXXX", // IG Seeding
    spotify:   "tblSPXXXX", // Spotify Playlisting
    soundcloud:"tblSCXXXX", // SoundCloud Campaigns
    youtube:   "tblYTXXXX", // YouTube Ratio
    invoices:  "tblINVXXX"  // Invoices
  },
  fields: {
    // SoundCloud fields (align with screenshot columns)
    sc: {
      TRACK_INFO: "fld_sc_track_info",
      CLIENT:     "fld_sc_client",
      SERVICE:    "fld_sc_service", // single select (e.g., Reposts)
      GOAL:       "fld_sc_goal",
      REMAINING:  "fld_sc_remaining",
      STATUS:     "fld_sc_status",  // single select (Cancelled, Active, Complete, ...)
      URL:        "fld_sc_url",
      SUBMIT_DT:  "fld_sc_submit",
      START_DT:   "fld_sc_start",
      RECEIPTS:   "fld_sc_receipts",
      OWNER:      "fld_sc_owner",
      NOTES:      "fld_sc_notes"
    },
    // Instagram fields
    ig: {
      STATUS:     "fld_ig_status",   // Backlog, In Progress, Needs QA, Done
      OWNER:      "fld_ig_owner",
      DUE_AT:     "fld_ig_due",
      PRIORITY:   "fld_ig_priority",
      CAPTION:    "fld_ig_caption",
      MEDIA_URL:  "fld_ig_media",
      SEND_FINAL_REPORT: "fld_ig_final_report_chk" // checkbox toggles Email automation
    },
    // Spotify pipeline
    sp: {
      STAGE:   "fld_sp_stage", // Sourcing, Outreach, Confirmed, Scheduled, Published
      OWNER:   "fld_sp_owner",
      ARTIST:  "fld_sp_artist",
      TRACK:   "fld_sp_track",
      CONTACT: "fld_sp_contact",
      ETA:     "fld_sp_eta",
      NOTES:   "fld_sp_notes"
    },
    // YouTube ratio (simplified)
    yt: {
      URL:     "fld_yt_url",
      VIEWS:   "fld_yt_views",
      LIKES:   "fld_yt_likes",
      COMMENTS:"fld_yt_comments",
      STATUS:  "fld_yt_status",
      ACTION:  "fld_yt_action"
    },
    inv: {
      STATUS: "fld_inv_status", // Request, Sent, Paid
      AMOUNT: "fld_inv_amount",
      CLIENT: "fld_inv_client",
      LINK:   "fld_inv_link"
    }
  }
};

// Airtable Views Configuration
export const VIEWS = {
  sc: {
    "Overview": "overview",
    "Queue": "queue",
    "Active Campaigns": "viwActiveCampaigns",
    "Upcoming Campaigns": "viwUpcoming",
    "No Receipt": "viwNoReceipt",
    "No Start Date": "viwNoStartDate",
    "Past Month's Repost": "viwPastMonth",
    "Invoice Not Paid": "viwInvoiceNotPaid",
    "All Campaigns": "viwAllCampaigns",
    "Kanban": "viwKanban"
  },
  ig: {
    "Overview": "overview",
    "Campaigns": "campaigns",
    "Board": "viwBoard",
    "All Posts": "viwAllPosts",
    "Due Soon": "viwDueSoon",
    "Owner: Me": "viwOwnerMe",
    "Completed": "viwCompleted"
  },
  sp: {
    "Overview": "overview",
    "Pipeline": "pipeline",
    "All": "viwAll",
    "Outreach": "viwOutreach",
    "Scheduled": "viwScheduled",
    "Published": "viwPublished"
  },
  yt: {
    "All Videos": "viwAllVideos",
    "Needs Fixing": "viwNeedsFixing",
    "Fixed": "viwFixed"
  },
  inv: {
    "All Invoices": "viwAllInvoices",
    "Request": "viwRequest",
    "Sent": "viwSent",
    "Paid": "viwPaid"
  },
  dealflow: {
    "Active Deals": "viwActiveDeals",
    "Pending Deals": "viwPendingDeals",
    "Completed Deals": "viwCompletedDeals",
    "All Deals": "viwAllDeals",
    "Revenue Pipeline": "viwRevenuePipeline"
  }
};