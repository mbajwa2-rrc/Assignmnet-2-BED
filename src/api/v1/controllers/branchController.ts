import { Request, Response } from "express";
import * as branchService from "../services/branchService";

/**
 * Creates a new branch after validation
 * @param req - Express request object
 * @param res - Express response object
 */
export const createBranch = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {name, address, phone} = req.body;
        if (!name || !address || !phone){
            res.status(400).json({ message: "Missing field."});
            return;
        }
        const newBranch = await branchService.createBranch({
            name,
            address,
            phone
        });
        res.status(201).json({ 
            message: "Branch created successfully.", 
            data: newBranch
        });
    }
    catch (error){
        res.status(500).json({ message: "Failed to create branch."});
    }
};

/**
 * Retrieves all branches
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllBranches = async (req: Request, res: Response
): Promise<void> => {
    try{
        const branches = await branchService.getAllBranches();
        res.status(200).json({
            message: "Retrieved all branches successfully.",
            data: branches
        });
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve branches."});
    }
};

/**
 * Retrieves a branch by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBranchById = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const branch = await branchService.getBranchById(Number(id));
        if (branch){
            res.status(200).json({
                message: "Branch retrieved successfully.",
                data: branch
            });
        }
        else{
            res.status(400).json({message: "Branch not found."});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve branch."});
    }
};

/**
 * Updates the branch specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateBranch = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const updatedData = req.body;
        const updatedBranch = 
            await branchService.updateBranch(Number(id), updatedData);
        if (updatedBranch){
            res.status(200).json({
                message: "Branch updated successfully.", 
                data: updatedBranch
            });
        }
        else{
            res.status(400).json({message: "Branch not found."});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to update branch."});
    }
};

/**
 * Deletes the branch specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteBranch = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedBranch = await branchService.deleteBranch(Number(id));
        if (deletedBranch){
            res.status(200).json({message: "Branch deleted successfully."});
        }
        else{
            res.status(400).json({message: "Branch not found"});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to delete branch."});
    }
};