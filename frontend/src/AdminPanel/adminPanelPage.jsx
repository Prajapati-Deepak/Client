import React from "react";
import ImageGallery from "react-image-gallery";
import { Typography, Box, Stack } from "@mui/material";
import { ColorButton, OutlinedButton } from "../components/Navbar/navbar";
import { AdminBoxContainer, AdminTextContainer, AdminWrapper } from "./adminPanelStyling";
import { TimeSince } from "../components/TimeElapsed/timecalc";
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function AdminPanelPage({ cardData, ApproveRequest, DeclineRequest, index }) {
    // ================================================================CardData ===============================================================
    // console.log(cardData);
    const imageThumbnail = cardData?.images;
    const title = cardData ? cardData.title.charAt(0).toUpperCase() + cardData.title.slice(1) : " ";
    const date = cardData ? new Date(cardData.createdAt) : "";
    // const properDate = `${date.toLocaleString("default", { month: "short", })} ${date.getDate()}, ${date.getFullYear()}`;
    const properDate = date ? TimeSince(date) : " ";
    const Description = cardData ? cardData.description : " ";

    //==============================================IMAGE PRODUCER ======================================================================
    const images = typeof (imageThumbnail) !== "undefined" ? (
        imageThumbnail.map((img, index) => {
            return {
                original: `${imageThumbnail[index]?.image}`,
                thumbnail: `${imageThumbnail[index]?.thumbnail}`,
            }
        })
    )
        : false;
    // =======================================================================================================================
    return (
        <>
            {/* <BoxContainer>this is discription page of </BoxContainer> */}
            <Box sx={{ pt: {xs:1} ,pb:4,bgcolor:"transparent",borderTop:`solid 2px`}}>
                <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold",pb: 2}}> Request {index + 1}</Typography>
                <AdminWrapper>
                    <AdminBoxContainer>
                        {images && <ImageGallery items={images} />}
                    </AdminBoxContainer>
                    <AdminTextContainer>
                        <Box display="flex" direction="row" justifyContent="center" sx={{ pt: { lg: 0, xs: 0.5 }, pl: { lg: 2, xs: 0 }, pb: { lg: 3, xs: 1 } }}>
                            <Typography variant="body1" fontWeight="bold">
                                Category:
                            </Typography>
                            <Typography variant="body2" sx={{ pt: "0.2rem", px: "1rem" }}>
                                {cardData?.category}
                            </Typography>
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                px: { xs: 0, lg: 2 },
                                pt: { lg: 0, xs: 2 },
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ px: { xs: 0, lg: 3 }, pt: 0, pb: 1 }}
                        >
                            {properDate}
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                pt: { xs: 1 },
                                px: { lg: 2, xs: 0 },
                                pb: { xs: 0 },
                            }}
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ pt: { xs: 0 }, px: { lg: 2, xs: 0 } }}
                        >
                            {Description}
                        </Typography>
                    </AdminTextContainer>

                </AdminWrapper>
                <Stack
                    spacing={{ xs: 1, sm: 2, md: 3 }}
                    direction="row"
                    display={{ sm: "flex" }}
                    justifyContent={"center"}
                    sx={{ pl: { lg: 2, xs: 0 } }}
                >
                    <OutlinedButton
                        variant="outlined"
                        sx={{
                            fontSize: { xs: "10px", md: "15px" },
                            fontWeight: "bold",
                        }}
                    onClick={() => { DeclineRequest(cardData._id)}}
                    >
                        Decline Request
                    </OutlinedButton>
                    <ColorButton
                        sx={{
                            fontSize: { xs: "10px", md: "15px" },
                            fontWeight: "bold",
                        }}
                        variant="contained"
                    onClick={()=>{ ApproveRequest(cardData._id)}}
                    >
                        Approve Request
                    </ColorButton>
                </Stack>
            </Box>
        </>
    );
}

export default AdminPanelPage;
