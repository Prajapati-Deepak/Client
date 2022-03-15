const express = require("express");
const {new_thread} = require("../controllers/Threads/create_thread");
const { fetch_live_threads, fetch_own_threads} = require("../Controllers/Threads/send_thread");
const {  send_saved_threads } = require("../Controllers/Threads/send_saved_threads");
const { save_threads} = require("../Controllers/Threads/save_thread");
const { delete_thread } = require("../Controllers/Threads/delete_thread");
const { add_comment } = require("../Controllers/Threads/add_comments&replies");
const {authorization} = require("../Middlewares/authorization")
const {send_commented_replied_threads}  = require("../Controllers/Threads/send_commented_replied_thread")

const router = express.Router();

router.post('/create_thread', authorization, new_thread);
router.get('/fetch_live_threads',  fetch_live_threads);
router.get('/fetch_own_threads', authorization, fetch_own_threads)
router.post('/delete_thread', authorization, delete_thread);
router.post('/add_comment', authorization,add_comment);
router.post('/save_threads', authorization, save_threads);
router.post('/send_saved_threads', authorization, send_saved_threads);
router.post('/send_commented_replied_threads', authorization, send_commented_replied_threads);
router.post('/delete_thread', authorization, delete_thread);
module.exports= router;

