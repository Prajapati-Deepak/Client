import React, { useState, useContext } from 'react'
import { Typography, Box, Paper, Avatar, Stack, styled, IconButton, CardHeader, Tooltip } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Comments from './comment';
import AddCommentBox from './addCommentBox';
import Collapse from '@mui/material/Collapse';
import { DiscussionCardStyle, LikeButtonStyle } from '../DiscussionStyling/discussionCardStyliing';
import { TimeSince } from '../../TimeElapsed/timecalc';
import { UserDataContext } from '../../_ContextFolder/webContext';
import { useDispatch } from 'react-redux';
import { modelPopUp } from '../../../AStatemanagement/Actions/userActions';
// ======================================================================================================================================================================
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return (
        <IconButton  {...other} sx={{ px: 0.5 }}>
            <Tooltip title="Comments" arrow>
                <MessageIcon sx={{ color: "#673ab7" }} />
            </Tooltip>
        </IconButton>
    )
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// ================================================================================================================================================================================================================================
function DiscussionCard({ data }) {
    const dispatch = useDispatch();

    const localUserData = useContext(UserDataContext);

    const token = localUserData?.token;
    const isLoggedIn = localUserData.isLogin;
    const userLoggedIn = localUserData?.user?._id
    const [localCardData, setLocalCardData] = useState(data);
    // ================================================================================================================================================================================================================================
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        if (isLoggedIn) {
            setExpanded(!expanded);
        } else {
            dispatch(modelPopUp(true));
        }

    };
    // =============================================================LIKEHANDLER=====================================================================================================================================================
    const [likeDislike, setLikeDislike] = useState({ likeStatus: false, dislikeStatus: false, totalCount: -7 })
    const likeIncreaseHandler = () => {
        if (isLoggedIn) {
            if (likeDislike.dislikeStatus && !likeDislike.likeStatus) {
                setLikeDislike((prev) => { return { ...prev, likeStatus: !prev.likeStatus, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount + 2) } })
            }
            else if (!likeDislike.likeStatus) {
                setLikeDislike((prev) => { return { ...prev, likeStatus: !prev.likeStatus, totalCount: (prev.totalCount + 1) } })
            }
            else {
                setLikeDislike((prev) => { return { ...prev, likeStatus: !prev.likeStatus, totalCount: (prev.totalCount - 1) } })
            }
        }
        else {
            dispatch(modelPopUp(true));
        }

    }
    const likeDecreaseHandler = () => {
        if (isLoggedIn) {
            if (likeDislike.likeStatus && !likeDislike.dislikeStatus) {
                setLikeDislike((prev) => { return { ...prev, likeStatus: !prev.likeStatus, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount - 2) } })
            }
            else if (!likeDislike.dislikeStatus) {
                setLikeDislike((prev) => { return { ...prev, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount - 1) } })
            }
            else {
                setLikeDislike((prev) => { return { ...prev, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount + 1) } })
            }
        } else {
            dispatch(modelPopUp(true));
        }
    }
    // ================================================================================================================================================================================================================================
    const [saved, setSaved] = useState(false);
    const SavedHandler = () => {
        if (isLoggedIn) {
            setSaved(!saved)
        } else {
            dispatch(modelPopUp(true));
        }
    }

    // ===================================================================================================================================================================================================================================
    console.log(data);
    const title = localCardData?.title;
    const description = localCardData?.description;
    const date = new Date(localCardData?.createdAt);
    const properDate = TimeSince(date);
    const userId = localCardData?.users_mnit_id;
    const comments = localCardData?.discussions;
    const commentCount = localCardData?.discussions.length;
    // ===================================================================================================================================================================================================================================
    const classes = DiscussionCardStyle();
    const likeButton = LikeButtonStyle(likeDislike);
    // ======================================================================================================================================================================================================================================
    const addCommentData = { token: token, cardId: data?._id, commentId: null, }
    const delFlag = (localCardData?.posted_by === userLoggedIn);
    const actionData = { delFlag: delFlag, userLoggedIn: userLoggedIn };


    // ========================================================================================================================================================================================================================================
    return (
        <>
            <Box display={"flex"} alignItems={"flex-start"} sx={{ width: "100%", my: "1rem", flexDirection: "column" }}>
                <Paper className={classes.dpaperStyle}>

                    <Box className={likeButton.likeCardBox}>
                        <IconButton className={likeButton.likeIncButton} onClick={likeIncreaseHandler}>
                            <Tooltip title="Upvote" arrow placement='left'><ArrowUpwardIcon /></Tooltip>
                        </IconButton>
                        <Stack className={likeButton.likeCardCount}>{Math.abs(likeDislike.totalCount)}</Stack>
                        <IconButton className={likeButton.likeDecButton} onClick={likeDecreaseHandler}>
                            {/* <Tooltip title="Downvote" arrow > <ArrowDownwardIcon /></Tooltip> */}
                            <Tooltip title="Downvote" arrow placement='left'><ArrowDownwardIcon/></Tooltip>

                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }} >
                        <Box sx={{ width: "94%", borderBottom: '2px  solid #757575' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: "#673ab7" }} />
                                }
                                title={userId}
                                subheader={properDate}
                                sx={{ p: 0 }}
                            />
                            <Typography variant='h6' sx={{ my: 1.5, wordBreak: "break-all", lineHeight: 1.3 }}>
                                {/* What does the fox say    Lorem ipsum dolor, sit amet consectetur adipisicing elit.? */}
                                {title}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: 1, wordBreak: "break-all", }} >
                                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Numquam quis laudantium deleniti vel est recusandae, doloremque sequi,
                            nostrum non modi illo esse tempora placeat saepe consequatur odit
                            architecto incidunt nobis aspernatur repudiandae odio, fugiat quos.
                            Cupiditate laboriosam aspernatur voluptatem! Facere molestias aliquam
                            vel maxime ab nostrum distinctio hic mollitia, ipsa voluptatibus sit
                            dolores pariatur repellat doloribus commodi odit excepturi tempore. */}
                                {description}
                            </Typography>
                        </Box>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Box>
                                {
                                    typeof (comments) !== "undefined" && (comments.map((data, index) => {
                                        return (
                                            <Comments addCommentData={addCommentData} commentData={data} key={index} actionData={actionData}></Comments>
                                        )
                                    }))
                                }
                                {/* <Comments commentData={commentData} /> */}
                                <AddCommentBox addCommentData={addCommentData} setLocalCardData={setLocalCardData} />
                            </Box>
                        </Collapse>
                        <Box className={classes.dactionBox}>
                            <Stack className={classes.dIconWrapper} >
                                <IconButton onClick={SavedHandler} >
                                    <Tooltip title="Save" arrow>
                                        {
                                            saved ? <BookmarkAddedIcon color="primary" /> : <BookmarkAddIcon />
                                        }
                                    </Tooltip>
                                </IconButton>

                                {
                                    delFlag && (
                                        // <Tooltip>
                                        <IconButton>
                                            <Tooltip title="Delete" arrow >
                                                <DeleteIcon />
                                            </Tooltip>
                                        </IconButton>)

                                }

                                <IconButton>
                                    <Tooltip title="Share" arrow>
                                        <ShareIcon color="primary" />
                                    </Tooltip>
                                </IconButton>

                            </Stack>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                            >
                            </ExpandMore>
                            <Typography variant="body2" sx={{ color: "#757575", mt: 1, pt: 0 }}>{commentCount > 0 ? commentCount : ' '}</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box >
            {/* {
                deletePopUp && isLoggedIn && (
                    <POPUPElement
                        open={deletePopUp}
                        onClose={setDeletePopUp}
                        portelId={"alertPortal"}
                    >
                        <DiscriptionProductDelete
                            productId={productId}
                            onClose={setDeletePopUp}
                        />
                    </POPUPElement>
                )
            } */}
        </>

    )
}

export default DiscussionCard