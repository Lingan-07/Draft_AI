const styles = {
    header_appbar: {
        width: `calc(100% - 260px)`,
        ml: `260px`,
        borderBottom: "1px solid #E5E7EB",
        height: 80,
    },

    header_toolbar: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    header_box: {
        display: "flex", 
        gap:2
    },

    header_avatar: {
        width: 45,
        height: 45,
        bgcolor: "primary.main",
        fontWeight: 700,
    },

    recent_draft_box: {
        mt: 2
    },

    recent_draft_card: {
        borderRadius: 1,
        border: "1px solid #E5E7EB",
    },

    recent_draft_cardcontent: {
        p: 2
    },

    recent_draft_cell: {
        fontWeight: 700
    },

    sidebar_drawer: {
        width: 260,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRight: "1px solid #E5E7EB",
          bgcolor: "background.default",
          color: "text.primary",
        }
    },

    sidebar_typography: { 
        pt: 1 
    },

    sidebar_divider: { 
        mt: 2.4 
    },

    sidebar_listitem: {
        mx: 1,
        mb: 0.5,
        borderRadius: 2,

        "&.Mui-selected": {
            backgroundColor: "#E8F0FE",
            color: "#2563EB",
        },

        "&.Mui-selected .MuiListItemIcon-root":{
            color: "#2563EB",
        },

        "&:hover": {
            backgroundColor: "#F3F4F6",
        },
    },

    sidebar_listitemicon: {
        minWidth:42
    },

    sidebar_box: {
        flexGrow: 1
    },

    sidebar_logout: {
        mx: 1,
        mb: 2,
        borderRadius: 2,

        "&:hover": {
            backgroundColor: "#FEF2F2",
            color: "#DC2626",
        },

        "&:hover .MuiListItemIcon-root": {
            color: "#DC2626",
        },
    },

    statcard_card: {
        borderRadius: 2,
        border: "1px solid #E5E7EB",
        height: 100,
        width: "70%",
        transition: "all .2s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        },
    },

    statcard_cardcontent: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
    },

    admin: {
        pb:5
    },

    user: {
        pb:5
    },

    textfield: {
        width: "500px",
        pt: 6,
    }
}

export default styles;