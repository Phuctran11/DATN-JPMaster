import databaseService from '../services/database.service.js';

/**
 * Purchase Interface
 * Represents a payment transaction record
 */
export interface Purchase {
  purchase_id: number;
  user_id: number;
  course_id: number;
  purchase_date: Date;
  price_paid: number;
  status: 'pending' | 'completed' | 'canceled';
}

/**
 * Format database row to Purchase object
 */
const formatPurchase = (row: any): Purchase => ({
  purchase_id: row.purchase_id,
  user_id: row.user_id,
  course_id: row.course_id,
  purchase_date: row.purchase_date,
  price_paid: Number(row.price_paid),
  status: row.status,
});

/**
 * PurchaseModel
 * Handles purchase/payment transaction tracking
 * Separate from Enrollment which handles access/enrollment tracking
 *
 * Responsibilities:
 * - Create and track payment transactions
 * - Manage purchase lifecycle (pending → completed/canceled)
 * - Support standard and voucher-based purchases
 * - Maintain payment audit trail
 */
export class PurchaseModel {
  /**
   * Create a new purchase/payment transaction
   * Records when a user pays for or accesses a course
   *
   * @param userId - User ID making the purchase
   * @param courseId - Course ID being purchased
   * @param pricePaid - Amount paid (0 for free courses)
   * @param status - Purchase status (default: 'completed')
   * @returns Created Purchase record
   * @throws Error if database fails
   */
  async createPurchase(
    userId: number,
    courseId: number,
    pricePaid: number,
    status: 'pending' | 'completed' | 'canceled' = 'completed'
  ): Promise<Purchase> {
    const query = `
      INSERT INTO "Purchase" (
        user_id, course_id, price_paid, status, purchase_date
      )
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING purchase_id, user_id, course_id, purchase_date, price_paid, status;
    `;

    try {
      const result = await databaseService.executeQuery(query, [
        userId,
        courseId,
        pricePaid,
        status,
      ]);

      if (!result.rows[0]) {
        throw new Error('Failed to create purchase record');
      }

      return formatPurchase(result.rows[0]);
    } catch (error) {
      throw new Error(
        `Failed to create purchase for user ${userId}, course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get purchase by ID
   *
   * @param purchaseId - Purchase ID
   * @returns Purchase record, or null if not found
   * @throws Error if database fails
   */
  async getPurchaseById(purchaseId: number): Promise<Purchase | null> {
    const query = `
      SELECT purchase_id, user_id, course_id, purchase_date, price_paid, status
      FROM "Purchase"
      WHERE purchase_id = $1;
    `;

    try {
      const result = await databaseService.executeQuery(query, [purchaseId]);
      return result.rows[0] ? formatPurchase(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch purchase ${purchaseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get all purchases by user
   * Returns paginated list of completed purchases
   *
   * @param userId - User ID
   * @param limit - Number of records to return (default: 10, max: 100)
   * @param offset - Pagination offset (default: 0)
   * @returns Array of Purchase records
   * @throws Error if database fails
   */
  async getPurchasesByUserId(userId: number, limit: number = 10, offset: number = 0): Promise<Purchase[]> {
    const limitSafe = Math.min(limit, 100);

    const query = `
      SELECT purchase_id, user_id, course_id, purchase_date, price_paid, status
      FROM "Purchase"
      WHERE user_id = $1 AND status = 'completed'
      ORDER BY purchase_date DESC
      LIMIT $2 OFFSET $3;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, limitSafe, offset]);
      return result.rows.map(formatPurchase);
    } catch (error) {
      throw new Error(
        `Failed to fetch purchases for user ${userId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update purchase status
   * Used to change payment status (pending → completed, etc.)
   *
   * @param purchaseId - Purchase ID to update
   * @param status - New purchase status
   * @returns Updated Purchase record, or null if not found
   * @throws Error if database fails
   */
  async updatePurchaseStatus(
    purchaseId: number,
    status: 'pending' | 'completed' | 'canceled'
  ): Promise<Purchase | null> {
    const query = `
      UPDATE "Purchase"
      SET status = $1
      WHERE purchase_id = $2
      RETURNING purchase_id, user_id, course_id, purchase_date, price_paid, status;
    `;

    try {
      const result = await databaseService.executeQuery(query, [status, purchaseId]);
      return result.rows[0] ? formatPurchase(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to update purchase status for purchase ${purchaseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Delete purchase record
   * Removes payment transaction from database
   *
   * @param purchaseId - Purchase ID to delete
   * @returns true if deletion successful, false if purchase not found
   * @throws Error if database fails
   */
  async deletePurchase(purchaseId: number): Promise<boolean> {
    const query = `DELETE FROM "Purchase" WHERE purchase_id = $1;`;

    try {
      const result = await databaseService.executeQuery(query, [purchaseId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw new Error(
        `Failed to delete purchase ${purchaseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get purchase by user and course
   * Helper to find existing purchase for specific user-course combination
   *
   * @param userId - User ID
   * @param courseId - Course ID
   * @returns Purchase record, or null if not found
   * @throws Error if database fails
   */
  async getPurchaseByUserAndCourse(userId: number, courseId: number): Promise<Purchase | null> {
    const query = `
      SELECT purchase_id, user_id, course_id, purchase_date, price_paid, status
      FROM "Purchase"
      WHERE user_id = $1 AND course_id = $2
      ORDER BY purchase_date DESC
      LIMIT 1;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, courseId]);
      return result.rows[0] ? formatPurchase(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch purchase for user ${userId}, course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get total revenue from completed purchases
   *
   * @returns Total sum of all completed purchase prices
   * @throws Error if database fails
   */
  async getTotalRevenue(): Promise<number> {
    const query = `
      SELECT SUM(price_paid) as total
      FROM "Purchase"
      WHERE status = 'completed';
    `;

    try {
      const result = await databaseService.executeQuery(query, []);
      return result.rows[0]?.total ? Number(result.rows[0].total) : 0;
    } catch (error) {
      throw new Error(
        `Failed to calculate total revenue: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get revenue by course
   *
   * @param courseId - Course ID
   * @returns Total revenue from completed purchases for the course
   * @throws Error if database fails
   */
  async getRevenueByCourse(courseId: number): Promise<number> {
    const query = `
      SELECT SUM(price_paid) as total
      FROM "Purchase"
      WHERE course_id = $1 AND status = 'completed';
    `;

    try {
      const result = await databaseService.executeQuery(query, [courseId]);
      return result.rows[0]?.total ? Number(result.rows[0].total) : 0;
    } catch (error) {
      throw new Error(
        `Failed to calculate revenue for course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

export default new PurchaseModel();
