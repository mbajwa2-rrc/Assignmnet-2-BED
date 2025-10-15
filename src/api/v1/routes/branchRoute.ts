import express, { Router } from "express";
import {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
} from "../controllers/branchController";

const router: Router = express.Router();

router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchById);
router.post("/branches", createBranch);
router.put("/branches/:id", updateBranch);
router.delete("/branches/:id", deleteBranch);

export default router;