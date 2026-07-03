const styles = {
    form_card: {
        mt: 3,
        p: 4,
        maxWidth: 900,
        borderRadius: 4,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
    },

    form_box: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        mt: 4,
    },

    list_grid: {
        mt: 1 
    },

    list_card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        transition: "all .25s ease",

        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
        },
    },

    list_cardcontent: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },

    list_typography_prompt: {
        flexGrow: 1,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        pt:2,
    },

    list_typography_created: {
        mt: 2,
        display: "block",
    },

    list_button: {
        mt: 3 
    }
}

export default styles;