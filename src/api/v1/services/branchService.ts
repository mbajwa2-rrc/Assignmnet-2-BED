import { Branch } from "../../../data/branches";
import * as firestoreRepository from "../repositories/firestoreRespository";

const BRANCHES_COLLECTION = "branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(BRANCHES_COLLECTION);
        const branches: Branch[] = snapshot.docs.map((doc: any) => ({
            id: Number(doc.id),
            ...(doc.data() as Omit<Branch, "id">),
        }));
        return branches;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get branches: ${errorMessage}`);
    }
};

export const getBranchById = async (id: number): Promise<Branch | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            BRANCHES_COLLECTION,
            id.toString()
        );
        if (!doc || !doc.exists) {
            return null;
        }
        return { id, ...(doc.data() as Omit<Branch, "id">) };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get branch ${id}: ${errorMessage}`);
    }
};

export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    try {
        const id = Date.now();
        await firestoreRepository.createDocument(
            BRANCHES_COLLECTION,
            branchData,
            id.toString()
        );
        return { id: Number(id), ...branchData };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create branch: ${errorMessage}`);
    }
};

export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "name" | "address" | "phone">
): Promise<Branch | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            BRANCHES_COLLECTION,
            id.toString()
        );
        if (!doc || !doc.exists) {
            return null;
        }
        await firestoreRepository.updateDocument(
            BRANCHES_COLLECTION,
            id.toString(),
            branchData
        );
        return { id, ...(branchData as Omit<Branch, "id">) };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update branch ${id}: ${errorMessage}`);
    }
};

export const deleteBranch = async (id: number): Promise<boolean | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            BRANCHES_COLLECTION,
            id.toString()
        );
        if (!doc || !doc.exists) {
            return null;
        }
        await firestoreRepository.deleteDocument(BRANCHES_COLLECTION, id.toString());
        return true;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete branch ${id}: ${errorMessage}`);
    }
};
