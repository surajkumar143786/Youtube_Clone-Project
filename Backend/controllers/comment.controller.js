import Comment from "../models/Comment.model.js";

// Add comment to a video
async function addComment(req, res) {
    try {
        const { text } = req.body;
        const { videoId } = req.params;

        if (!text) {
            return res.status(400).json({ message: "comment is required" });
        }

        const commentCreate = new Comment({
            text,
            video: videoId,
            user: req.user._id
        });

        await commentCreate.save();

        return res.status(201).json({
            message: "comment added successfully",
            comment: commentCreate
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error during comment",
            error: err.message
        });
    }
}

// Get comments for a video
async function getCommentsByVideo(req, res) {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ video: videoId })
            .populate("user", "userName")
            .sort({ createdAt: -1 }); 

        return res.status(200).json({
            count: comments.length,
            comments
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error while getting comments",
            error: err.message
        });
    }
}

// Update comment
async function updateComment(req, res) {
    try {
        const { text } = req.body;
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "not allowed to edit this comment" });
        }

        comment.text = text || comment.text;
        await comment.save();

        return res.status(200).json({
            message: "comment updated successfully",
            comment
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error while editing comment",
            error: err.message
        });
    }
}

// Delete comment
async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId); // ✅ FIXED

        if (!comment) {
            return res.status(404).json({ message: "comment not found" });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "not allowed to delete this comment" });
        }

        await comment.deleteOne();

        return res.status(200).json({ message: "comment deleted successfully" });

    } catch (err) {
        return res.status(500).json({
            message: "server error while deleting comment",
            error: err.message
        });
    }
}

export {
    addComment,
    getCommentsByVideo,
    updateComment,
    deleteComment
};