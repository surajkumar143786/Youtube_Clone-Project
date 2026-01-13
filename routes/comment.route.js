import express from 'express'
import { addComment, deleteComment, getCommentsByVideo, updateComment } from '../controllers/comment.controller.js'
import protect from '../middleware/auth.middleware.js'

const commentRouter = express.Router()

// Add comment to a video
commentRouter.post("/:videoId", protect, addComment);

// Get comments of a video
commentRouter.get("/:videoId", getCommentsByVideo);

// Update a comment
commentRouter.put("/:commentId", protect, updateComment);

// Delete a comment
commentRouter.delete("/:commentId", protect, deleteComment);

export default commentRouter;