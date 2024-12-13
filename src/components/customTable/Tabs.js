import { Grid } from "@mui/material"

function Tabs({ active, title, children, onClick }) {

  return (
    <>
      <Grid onClick={onClick} className={active && "custombutton"} sx={active ? { color: "#ffffff", padding: "9.5px 16px", fontWeight: 500, borderRadius: "100px", cursor: "pointer" } : {
        background: "#FFFFFF", border: "1px solid #E2E8F0", color: "rgba(0, 0, 0, 0.4)",
        padding: "9.5px 16px", borderRadius: "100px", fontWeight: 500, cursor: "pointer"
      }}>
        {title}
      </Grid>
      <Grid item>

        {children}
      </Grid>
    </>
  )

}
export default Tabs