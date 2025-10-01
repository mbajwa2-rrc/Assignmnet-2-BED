import {Branch, branches} from "../../../data/branches";


/**
 * Retrieves all branches
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

/**
 * Retrieves branch by ID
 * @returns The branch that was retrieved or undefined if not found
 */
export const getBranchById = async (id: number): Promise<Branch | undefined> => {
    for (const branch of branches){
        if (branch.id === id){
            return structuredClone(branch);
        }
    }
    return undefined;
};

/**
 * Creates a new branch
 * @param branchData - Only the fields needed to create a branch
 * @returns The created branch
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    const newBranch: Branch = {
        id: Date.now(),
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone
    }
    branches.push(newBranch);
    return newBranch;
};

/**
 * Updates an existing branch
 * @param id - The ID of the branch to update
 * @param branchData - Only fields that can be updated
 * @returns The updated branch or undefined if not found
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "name" | "address" | "phone">
): Promise<Branch | undefined> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1){
        return undefined;
    }

    branches[index] = {
        ...branches[index],
        ...branchData,
    };

    return structuredClone(branches[index]);
};

/**
 * Deletes a branch
 * @param id - The ID of the branch to delete
 * @returns The confirmation if the branch was deleted or undefined if not found
 */
export const deleteBranch = async (id: number): Promise<string | undefined> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1){
        return undefined;
    }

    branches.splice(index, 1);
    return "Branch deleted successfully.";
};