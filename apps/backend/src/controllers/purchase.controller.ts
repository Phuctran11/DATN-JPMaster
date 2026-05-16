import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import purchaseModel from "../models/purchase.model.js";

export class PurchaseController {

  async getPurchase(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { purchaseId } = req.params;

      if (!purchaseId || isNaN(Number(purchaseId))) {
        return res.status(400).json({ error: "Invalid purchase ID" });
      }

      const purchase = await purchaseModel.getPurchaseById(Number(purchaseId));

      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      // Verify ownership
      if (purchase.user_id !== req.user.user_id) {
        return res.status(403).json({ error: "Access denied" });
      }

      return res.status(200).json({ data: purchase });
    } catch (error) {
      next(error);
    }
  }


}

export default new PurchaseController();
