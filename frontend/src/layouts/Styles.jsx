const styles = {
    auth_box: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
    },

    auth_paper: {
        overflow: "hidden",
        borderRadius: 4,
        display: "flex",
        minHeight: "650px",
    },

    auth_left_side: {
        width: "50%",
        bgcolor: "primary.main",
        color: "white",
        display: {
            xs: "none",
            md: "flex",
        },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
    },

    auth_right_side: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
    },

    main_box: {
        flexGrow: 1,
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        px: 5,
        py: 4,
    },

    children_box: {
        maxWidth: 1400,
        mx: "auto",
    },

    dashboard_box: {
        display: "flex",
    }

}

export default styles;