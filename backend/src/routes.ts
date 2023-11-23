import express from "express"
import authRoutes from "./routes/auth.routes";
import codeEditorRoutes from "./routes/codeEditor.routes";

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/auth', codeEditorRoutes)

export default router