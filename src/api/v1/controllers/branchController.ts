import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { successResponse, errorResponse } from "../models/responseModel";

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
            res.status(400).json(errorResponse(
                null,
                "Missing field."
            ));
            return;
        }
        const newBranch = await branchService.createBranch({
            name,
            address,
            phone
        });
        res.status(201).json(successResponse(
            newBranch,
            "Branch created successfully."
        ));
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to create branch."
        ));
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
        res.status(200).json(successResponse(
            branches,
            "Retrieved all branches successfully."
        ));
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to retrieve branches."
        ));
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
            res.status(200).json(successResponse(
                branch,
                "Branch retrieved successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null,
                "Branch not found."
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to retrieve branch."
        ));
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
        const {name, address, phone} = req.body;
        if (!name || !address || !phone){
            res.status(400).json(errorResponse(
                null,
                "Missing field."
            ));
            return;
        }
        const updatedBranch = 
            await branchService.updateBranch(Number(id), 
            {name, address, phone});
        if (updatedBranch){
            res.status(200).json(successResponse(
                updatedBranch,
                "Branch updated successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null,
                "Branch not found."
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to update branch."
        ));
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
            res.status(200).json(successResponse(
                null,
                "Branch deleted successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null,
                "Branch not found"
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to delete branch."
        ));
    }
};