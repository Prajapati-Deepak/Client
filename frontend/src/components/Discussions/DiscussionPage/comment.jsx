import React, { useState, useEffect } from 'react'
import { Typography, Box, Avatar, Stack, styled, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ReplyButton, CommentDeleteButton, ViewRepliesButton } from '../DiscussionStyling/discussionStyling';
import Reply from "./reply"
import ReplyCommentBox from './replyCommentBox';
import Collapse from '@mui/material/Collapse';
import { CommentReplyStyle, LikeButtonStyle } from '../DiscussionStyling/discussionCardStyliing';
import { TimeSince } from '../../TimeElapsed/timecalc';
import { ExpandMore } from './_expandMore';
import { useDispatch } from 'react-redux';
import { actionForLikeThread } from '../../../AStatemanagement/Actions/userActions';
// import { ViewMoreButton } from '../DiscussionStyling/discussionStyling';



const ExpandMoreReplies = styled((props) => {
    const { expand, replyCount, ...other } = props;
    return (
        <ViewRepliesButton {...other}>
            {!expand && `View Replies (${replyCount})`}
            {expand && "Hide Replies"}
        </ViewRepliesButton>)
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


// ================================================================================================================================================================================
function Comments({ commentData, addCommentData, actionData }) {

    const dispatch = useDispatch();
    const [likeDislike, setLikeDislike] = useState({ likeStatus: false, dislikeStatus: false, totalCount: 9 })
    const [localCommentData, setLocalCommentData] = useState(commentData);
    const [expAddCmnt, setExpAddCmt] = useState(false);
    const [expReplies, setExpReplies] = useState(false);
    // const [replyVisible, setReplyVisible] = useState(3);
    // ==========================================================================================================================================================================
    const handleExpandClick = () => {
        setExpAddCmt(!expAddCmnt);
    };
    const handleViewRepliesClick = () => {
        setExpReplies(!expReplies);
    };

    //  ========================================================================================================================================================================
    const initialState = { likeStatus: false, dislikeStatus: false };

    const likeIncreaseHandler = () => {
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
    const likeDecreaseHandler = () => {
        if (likeDislike.likeStatus && !likeDislike.dislikeStatus) {
            setLikeDislike((prev) => { return { ...prev, likeStatus: !prev.likeStatus, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount - 2) } })
        }
        else if (!likeDislike.dislikeStatus) {
            setLikeDislike((prev) => { return { ...prev, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount - 1) } })
        }
        else {
            setLikeDislike((prev) => { return { ...prev, dislikeStatus: !prev.dislikeStatus, totalCount: (prev.totalCount + 1) } })
        }
    }

    //   ===========================================================================================================================================================================
    // console.log(commentData);
    const comment = localCommentData.content;
    const commentId = localCommentData._id;
    const userId = localCommentData.mnit_id;
    const commentedBy = localCommentData.commented_by;
    const date = new Date(localCommentData.createdAt);
    const properDate = TimeSince(date);
    const replies = localCommentData.replies.slice(0).reverse();
    const replyCount = replies.length;
    const addReplyData = { ...addCommentData, commentId: commentId }
    // ========================================================================================================

    useEffect(() => {

        return () => {
            console.log("deepakcomment")
            if ((initialState.likeStatus || !initialState.likeStatus) && !initialState.dislikeStatus) {
                if (!likeDislike.likeStatus && !likeDislike.dislikeStatus) {
                    console.log('false2')
                    //false2
                    const data = { status: "false2", ...addReplyData }
                    dispatch(actionForLikeThread(data));

                } else if (!likeDislike.likeStatus && likeDislike.dislikeStatus) {
                    console.log('false1')

                    //false1
                    const data = { status: "false1", ...addReplyData }
                    dispatch(actionForLikeThread(data));

                }
            }
            if (!initialState.likeStatus && (initialState.dislikeStatus || !initialState.dislikeStatus)) {
                if (!likeDislike.likeStatus && !likeDislike.dislikeStatus) {
                    console.log('true2')

                    //true2
                    const data = { status: "true2", ...addReplyData }
                    dispatch(actionForLikeThread(data));

                } else if (initialState.likeStatus && !initialState.dislikeStatus) {
                    console.log('true1')

                    //   true1
                    const data = { status: "true1", ...addReplyData }
                    dispatch(actionForLikeThread(data));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    // =====================================================================================================================================================================================
    const classes = CommentReplyStyle();
    const likeButton = LikeButtonStyle(likeDislike);

    // ===============================================================================================
    // const ReplyVisibleHandler = () => {
    //     setReplyVisible((prev) => (prev + 2 < replyCount ? prev + 2 : replyCount))
    // }

    // =======================================================================================================================================================================================================
    return (
        <Box>
            <Box sx={{ bgcolor: "#ede7f6", px: { xs: 1, sm: 3 }, py: 1, my: "0.5rem" }}>
                <Box className={classes.topBox}>
                    <Stack className={classes.topStack}>
                        <Avatar className={classes.avatarStyle} />
                        <Typography className={classes.usernameStyle}>
                            {userId}
                        </Typography>
                    </Stack>
                    <Typography className={classes.dateStyle}>{properDate}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }} >
                    <Box className={likeButton.likeCardBox}>
                        <IconButton className={likeButton.likeIncButton} onClick={likeIncreaseHandler}><ArrowUpwardIcon sx={{ fontSize: 15 }} /></IconButton>
                        <Stack className={likeButton.likeCommentCount}>{Math.abs(likeDislike.totalCount)}</Stack>
                        <IconButton className={likeButton.likeDecButton} onClick={likeDecreaseHandler}><ArrowDownwardIcon sx={{ fontSize: 15 }} /></IconButton>
                    </Box>
                    <Box className={classes.mainBox}>
                        <Typography className={classes.contentBox}>
                            {comment}
                        </Typography>
                        <Box className={classes.actionBoxStyle}>
                            <Box className={classes.buttonWrapper} >
                                <ExpandMore
                                    expand={expAddCmnt}
                                    onClick={handleExpandClick}
                                // aria-expanded={expanded}
                                >
                                    <ReplyButton>Reply</ReplyButton>
                                </ExpandMore>

                                {
                                    (actionData.delFlag || commentedBy === actionData.userLoggedIn ? <CommentDeleteButton>Delete</CommentDeleteButton> : null)

                                }
                            </Box>
                            <Box>
                                {replyCount > 0 &&
                                    <ExpandMoreReplies
                                        expand={expReplies}
                                        onClick={handleViewRepliesClick}
                                        replyCount={replyCount}
                                    // aria-expanded={expandedReplies}
                                    >
                                    </ExpandMoreReplies>
                                }

                            </Box>
                        </Box>
                        <Collapse in={expAddCmnt} timeout="auto" unmountOnExit>
                            <ReplyCommentBox
                                handleExpandClick={handleExpandClick}
                                addReplyData={addReplyData}
                                setLocalCommentData={setLocalCommentData}
                                setExpandedReplies={setExpReplies}
                            />
                        </Collapse>
                        <Collapse in={expReplies} timeout="auto" unmountOnExit>
                            {
                                typeof (replies) !== "undefined" && (replies.map((data) => {
                                    return (
                                        <Reply addReplyData={addReplyData} replyData={data} key={data._id}></Reply>
                                    )
                                }))
                            }
                            {/* {(replyVisible < replyCount) && (
                                <Box sx={{ display: "flex", justifyContent: "center", pt: "0.5rem" }}>
                                    <ViewMoreButton onClick={ReplyVisibleHandler}>View more replies({replyCount - replyVisible})</ViewMoreButton>
                                </Box>
                            )
                            } */}
                        </Collapse>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default Comments;